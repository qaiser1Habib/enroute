// redis.js
const { createHash } = require("crypto");
const redisClient = require("./redisClient");

const cacheOptions = {
	defaultTTL: 3600, // default TTL in seconds
};

function generateCacheKey(req) {
	const relevantHeaders = {
		authorization: req.headers.authorization,
	};

	const bodyString = JSON.stringify(req.body, Object.keys(req.body).sort());
	const queryString = JSON.stringify(req.query, Object.keys(req.query).sort());
	const headersString = JSON.stringify(relevantHeaders, Object.keys(relevantHeaders).sort());

	const hash = createHash("sha256");
	hash.update(`${req.originalUrl}-${bodyString}-${queryString}-${headersString}`);
	return hash.digest("hex");
}

function isBinaryContent(contentType) {
	const binaryContentTypes = ["image/png", "image/jpeg", "image/gif", "image/webp", "video/mp4", "application/octet-stream"];
	return binaryContentTypes.includes(contentType);
}

const redisCache =
	(options = cacheOptions) =>
	async (req, res, next) => {
		if (req.method !== "GET") {
			return next(); // Skip non-GET requests
		}

		const key = `cache:${generateCacheKey(req)}`;
		const TTL = req.cacheTTL || options.defaultTTL;

		try {
			const cacheResult = await redisClient.get(key);
			if (cacheResult !== null) {
				res.setHeader("X-Cache", "HIT");
				const parsedResult = JSON.parse(cacheResult);

				if (parsedResult.type === "binary") {
					const buffer = Buffer.from(parsedResult.data, "base64");
					res.writeHead(200, { "Content-Type": parsedResult.contentType });
					res.end(buffer);
				} else {
					res.status(200).json(parsedResult.data);
				}
			} else {
				res.setHeader("X-Cache", "MISS");
				const originalEnd = res.end.bind(res);
				const chunks = [];

				res.end = (chunk, ...args) => {
					if (chunk) {
						chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
					}
					originalEnd(chunk, ...args);
				};

				res.once("finish", async () => {
					const data = Buffer.concat(chunks);
					let dataToCache;
					const contentType = res.getHeader("content-type");

					if (isBinaryContent(contentType)) {
						dataToCache = JSON.stringify({ type: "binary", data: data.toString("base64"), contentType });
					} else {
						try {
							const jsonData = JSON.parse(data.toString());
							dataToCache = JSON.stringify({ type: "json", data: jsonData });
						} catch {
							dataToCache = JSON.stringify({ type: "text", data: data.toString() });
						}
					}

					await redisClient.set(key, dataToCache, "EX", TTL).catch((cacheError) => {
						console.error("Redis set error:", cacheError);
					});
				});

				next();
			}
		} catch (error) {
			console.error("Redis get error:", error);
			next(error);
		}
	};

module.exports = { redisCache };
