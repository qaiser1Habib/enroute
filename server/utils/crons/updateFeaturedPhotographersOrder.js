require("dotenv").config({ path: __dirname + "../../.env" }); //get secret keys from env files
const mongoose = require("mongoose");
const moment = require("moment");
const users = require("../../models/users");

// connect database
mongoose
	.connect(process.env.MONGO_DB_CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		console.info(`-> Database connected::success\t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n\n`);

		await updateFeaturedPhotographersOrder();
	})
	.catch((error) => {
		console.error("Database connection error:", error);
		process.exit(1);
	});

const updateFeaturedPhotographersOrder = async () => {
	try {
		// Update home featured photographers
		await updateFeaturedOrder("home");

		// Update photographers page featured photographers
		await updateFeaturedOrder("photographers");

		console.info("Photographers Order Updated");

		// Close MongoDB connection
		await mongoose.connection.close();
		process.exit(0);
	} catch (error) {
		console.error("An error occurred:", error);
		await mongoose.connection.close();
		process.exit(1); // Close the process with an error code
	}
};

const updateFeaturedOrder = async (pageType) => {
	try {
		const query = {
			$or: [
				{ [`photographer.featured.${pageType}.isActive`]: true },
				{ [`photographer.featured.${pageType}.isActiveByAdmin`]: true },
			],
		};

		const dbFeaturedUsers = await users.find(query).sort({ [`photographer.featured.${pageType}.order`]: 1 });
		console.info(`Total Featured Photographers for ${pageType} -> ` + dbFeaturedUsers?.length);

		const userIds = dbFeaturedUsers.map((user) => user._id.toString());
		console.info(`User IDs to shuffle for ${pageType} -> `, userIds);

		// Shuffle user IDs
		for (let i = userIds.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[userIds[i], userIds[j]] = [userIds[j], userIds[i]];
		}

		console.info(`Shuffled User IDs for ${pageType} -> `, userIds);

		// Update documents with new order IDs
		for (let i = 0; i < userIds.length; i++) {
			const user = await users.findById(userIds[i]);
			user.photographer.featured[pageType].order = i + 1;
			await user.save();
			console.info(`Updated order for user ${user._id} to ${i + 1}`);
		}
	} catch (error) {
		console.error(`An error occurred while updating ${pageType}:`, error);
	}
};
