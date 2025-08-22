const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") }); // Load environment variables from .env in the same directory

const { S3Client, DeleteObjectCommand, ListObjectsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { CloudFrontClient, CreateInvalidationCommand } = require("@aws-sdk/client-cloudfront");

// Helper function to dynamically import ESM modules
async function dynamicImportESM(modulePath) {
	return import(modulePath);
}

// Parse command-line arguments for environment
const env = process.argv[2]; // --dev or --prod

if (!env || (env !== "--dev" && env !== "--prod")) {
	console.error("Please provide a valid environment argument: --dev or --prod");
	process.exit(1);
}

// Define environment-specific variables from the .env file
const config = {
	"--dev": {
		adminS3Bucket: process.env.AWS_S3_DEV_ADMIN_BUCKET,
		websiteS3Bucket: process.env.AWS_S3_DEV_WEBSITE_BUCKET,
		ec2User: process.env.EC2_DEV_USER,
		ec2Host: process.env.EC2_DEV_HOST,
		ec2KeyPath: process.env.EC2_DEV_KEY_PATH,
		ec2RemoteDir: process.env.EC2_DEV_REMOTE_DIR,
		adminDistributionId: process.env.AWS_CLOUDFRONT_ADMIN_DISTRIBUTION_ID,
		websiteDistributionId: process.env.AWS_CLOUDFRONT_WEBSITE_DISTRIBUTION_ID,
	},
	"--prod": {
		adminS3Bucket: process.env.AWS_S3_PROD_ADMIN_BUCKET,
		websiteS3Bucket: process.env.AWS_S3_PROD_WEBSITE_BUCKET,
		ec2User: process.env.EC2_PROD_USER,
		ec2Host: process.env.EC2_PROD_HOST,
		ec2KeyPath: process.env.EC2_PROD_KEY_PATH,
		ec2RemoteDir: process.env.EC2_PROD_REMOTE_DIR,
		adminDistributionId: process.env.AWS_CLOUDFRONT_ADMIN_DISTRIBUTION_ID,
		websiteDistributionId: process.env.AWS_CLOUDFRONT_WEBSITE_DISTRIBUTION_ID,
	},
};

// Function to validate environment variables
function validateEnvVariables(environment) {
	const vars = config[environment];
	const missingVars = [];

	// Check if required variables are present
	for (const [key, value] of Object.entries(vars)) {
		if (!value) {
			missingVars.push(key);
		}
	}

	if (missingVars.length > 0) {
		console.error(`Missing environment variables for ${environment}: ${missingVars.join(", ")}`);
		process.exit(1);
	}
}

// Validate environment variables for the selected environment
validateEnvVariables(env);

// AWS credentials and region from the .env file
const awsRegion = process.env.AWS_S3_AWS_REGION;
const awsAccessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

// Ensure AWS credentials and region are set
if (!awsRegion || !awsAccessKeyId || !awsSecretAccessKey) {
	console.error("AWS credentials or region are not set properly in the .env file.");
	process.exit(1);
}

// Initialize the S3 client with custom timeouts
const s3 = new S3Client({
	region: awsRegion,
	credentials: {
		accessKeyId: awsAccessKeyId,
		secretAccessKey: awsSecretAccessKey,
	},
	requestHandler: {
		metadata: { httpOptions: { timeout: 300000 } }, // 5 minutes timeout
	},
});

const cloudfront = new CloudFrontClient({
	region: awsRegion,
	credentials: {
		accessKeyId: awsAccessKeyId,
		secretAccessKey: awsSecretAccessKey,
	},
});

// Define paths for admin, website, and server directories
const adminDir = path.join(__dirname, "../admin");
const websiteDir = path.join(__dirname, "../website");
const serverDir = path.join(__dirname, "../server"); // Server files directory
const { adminS3Bucket, websiteS3Bucket, ec2User, ec2Host, ec2KeyPath, ec2RemoteDir, adminDistributionId, websiteDistributionId } =
	config[env];

// Function to check and set correct permissions for the .pem file
function ensurePemFilePermissions(pemFilePath) {
	try {
		const stat = fs.statSync(pemFilePath);

		// Check if the file has the correct permissions (0o400)
		if ((stat.mode & 0o777) !== 0o400) {
			console.info(`Setting correct permissions for .pem file at ${pemFilePath}`);
			fs.chmodSync(pemFilePath, 0o400);
		}
	} catch (error) {
		console.error(`Error setting permissions for .pem file: ${error.message}`);
		process.exit(1);
	}
}

// Ensure the correct permissions for the .pem file
ensurePemFilePermissions(ec2KeyPath);

// Function to execute shell commands
function runCommand(command) {
	try {
		execSync(command, { stdio: "inherit" });
	} catch (error) {
		console.error(`Error executing command: ${command}`);
		process.exit(1);
	}
}

// Function to upload server files to EC2 using rsync, excluding certain directories and files
function uploadFilesToEC2(localDir, remoteDir) {
	try {
		console.info(`Uploading server files to EC2 at ${ec2Host}...`);

		// Wrap ec2KeyPath in quotes to handle spaces
		const rsyncCommand = `rsync -avz --exclude 'node_modules' --exclude 'assets' --exclude 'package-lock.json' --exclude '.env' -e "ssh -i '${ec2KeyPath}'" ${localDir}/ ${ec2User}@${ec2Host}:${remoteDir}`;
		runCommand(rsyncCommand);

		console.info(`Server files uploaded to EC2 at ${remoteDir}.`);

		// Update the remote command to use 'cmp' instead of 'md5sum'
		const remoteCommand = `
      cd ${remoteDir} && \
      if [ -f package.json ] && { [ ! -f package.json.bak ] || ! cmp -s package.json package.json.bak; }; then
        echo "package.json has changed, running npm install..." && \
        npm install && \
        cp package.json package.json.bak;
      fi
      pm2 reload all
    `;

		// Run the remote command
		runRemoteCommand(remoteCommand.trim());
	} catch (error) {
		console.error(`Error uploading server files to EC2: ${error.message}`);
		process.exit(1);
	}
}

// Function to run remote commands on EC2
function runRemoteCommand(command) {
	try {
		// Ensure the command is correctly quoted to prevent syntax issues
		const sshCommand = `ssh -i '${ec2KeyPath}' ${ec2User}@${ec2Host} "${command.replace(/"/g, '\\"')}"`;
		runCommand(sshCommand);
	} catch (error) {
		console.error(`Error executing remote command: ${error.message}`);
		process.exit(1);
	}
}

// Function to remove all objects in an S3 bucket using batch deletion
async function emptyS3Bucket(bucketName) {
	try {
		// List objects in the bucket
		const listParams = { Bucket: bucketName };
		const listedObjects = await s3.send(new ListObjectsCommand(listParams));

		if (!listedObjects.Contents || listedObjects.Contents.length === 0) return;

		// Delete each object in batches
		await Promise.all(listedObjects.Contents.map(({ Key }) => s3.send(new DeleteObjectCommand({ Bucket: bucketName, Key }))));

		console.info(`Emptied bucket ${bucketName}`);
	} catch (error) {
		console.error(`Error emptying bucket ${bucketName}: ${error.message}`);
		process.exit(1);
	}
}

// Function to upload a directory to an S3 bucket with retries
async function uploadDirectoryToS3(directory, bucketName, rootDir = directory) {
	// Dynamically import mime here
	const mime = await dynamicImportESM("mime");

	const files = fs.readdirSync(directory).filter((file) => !file.startsWith(".")); // Exclude hidden files like .DS_Store

	// Upload files in parallel with a concurrency limit
	const concurrencyLimit = 5; // Number of parallel uploads
	const fileUploadPromises = files.map((file) => async () => {
		const filePath = path.join(directory, file);
		const fileStat = fs.statSync(filePath);

		if (fileStat.isDirectory()) {
			// Recursively upload subdirectories
			await uploadDirectoryToS3(filePath, bucketName, rootDir);
		} else {
			const fileStream = fs.createReadStream(filePath);
			const mimeType = mime.default.getType(filePath) || "application/octet-stream"; // Adjusted for ESM import

			// Determine the S3 key by calculating the relative path from the root directory
			const s3Key = path.relative(rootDir, filePath).replace(/\\/g, "/"); // Fix for Windows paths

			const uploadParams = {
				Bucket: bucketName,
				Key: s3Key, // Use the relative path as the S3 key
				Body: fileStream,
				ContentType: mimeType,
			};

			await retryUpload(uploadParams, 5); // Retry up to 5 times
		}
	});

	// Run uploads with limited concurrency
	await runWithConcurrency(fileUploadPromises, concurrencyLimit);
}

// Helper function to run promises with limited concurrency
async function runWithConcurrency(tasks, concurrencyLimit) {
	const taskQueue = [...tasks];
	const results = [];

	async function worker() {
		while (taskQueue.length > 0) {
			const task = taskQueue.shift();
			results.push(await task());
		}
	}

	const workers = Array(concurrencyLimit)
		.fill(worker)
		.map((fn) => fn());
	await Promise.all(workers);
	return results;
}

// Function to retry upload with exponential backoff
async function retryUpload(uploadParams, maxRetries) {
	let attempt = 0;
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	while (attempt < maxRetries) {
		try {
			await s3.send(new PutObjectCommand(uploadParams));
			console.info(`Uploaded ${uploadParams.Key} to ${uploadParams.Bucket}`);
			return;
		} catch (error) {
			attempt++;
			console.error(`Error uploading ${uploadParams.Key} to ${uploadParams.Bucket} (Attempt ${attempt}): ${error.message}`);
			if (attempt < maxRetries) {
				await delay(1000 * 2 ** attempt); // Exponential backoff
			} else {
				console.error(`Failed to upload ${uploadParams.Key} after ${maxRetries} attempts.`);
				process.exit(1);
			}
		}
	}
}

// Build both admin and website apps in parallel
async function buildApps() {
	console.info("Building admin and website apps in parallel...");
	await Promise.all([
		runCommand(`cd ${adminDir} && npm install && npm run build`),
		runCommand(`cd ${websiteDir} && npm install && npm run build`),
	]);
	console.info("Admin and website apps built successfully.");
}

// Remove old content from both S3 buckets in parallel
async function deleteBuckets() {
	console.info(`Removing old content from S3 buckets for ${env} environment in parallel...`);
	await Promise.all([emptyS3Bucket(adminS3Bucket), emptyS3Bucket(websiteS3Bucket)]);
	console.info("Old content removed from both S3 buckets.");
}

// Function to invalidate CloudFront cache
async function invalidateCache(distributionId) {
	try {
		const invalidationParams = {
			DistributionId: distributionId,
			InvalidationBatch: {
				Paths: { Quantity: 1, Items: ["/*"] },
				CallerReference: `invalidate-${Date.now()}`,
			},
		};
		const invalidation = await cloudfront.send(new CreateInvalidationCommand(invalidationParams));
		console.info(`Cache invalidation requested: ${invalidation.Invalidation.Id}`);
	} catch (error) {
		console.error(`Error creating CloudFront invalidation: ${error.message}`);
		process.exit(1);
	}
}

// Main deployment process
(async () => {
	// Step 1: Build React apps in parallel
	await buildApps();

	// Step 2: Remove old content from S3 buckets in parallel
	await deleteBuckets();

	// Step 3: Upload new content to S3 buckets
	console.info(`Uploading new content to S3 buckets for ${env} environment...`);
	await uploadDirectoryToS3(path.join(adminDir, "dist"), adminS3Bucket);
	await uploadDirectoryToS3(path.join(websiteDir, "dist"), websiteS3Bucket);

	// Step 4: Invalidate CloudFront caches for admin and website distributions
	await invalidateCache(adminDistributionId);
	await invalidateCache(websiteDistributionId);

	// Step 4: Upload server files to EC2
	console.info(`Uploading server files to EC2 for ${env} environment...`);
	uploadFilesToEC2(serverDir, ec2RemoteDir);

	console.info(`Deployment completed successfully for ${env} environment!`);
})();
