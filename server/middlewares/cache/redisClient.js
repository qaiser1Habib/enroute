// redisClient.js
const redis = require("redis");

const redisClient = redis.createClient({ host: "localhost", port: 6379 });

redisClient
	.connect()
	.then(() => {
		console.info("Connected to Redis");
	})
	.catch((err) => {
		console.error("Could not connect to Redis:", err);
		process.exit(1); // Exit if there is a connection error
	});

module.exports = redisClient;
