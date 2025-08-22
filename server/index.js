// index.js
require("dotenv").config();
require("./utils/constants.js");
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
// const redisClient = require("./middlewares/cache/redisClient.js");
// const { sendJsonResponse } = require("./utils/helpers");
// const multer = require("multer");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// Raw endpoints
app.post("/v1/payments/webhook", express.raw({ type: "application/json" }));

// Body parsers for json and urlencoded data
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

// CORS configuration
const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || process.env.ALLOWED_ORIGINS.split(",").indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};
app.use(cors());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_DB_CONNECTION_URL)
	.then(() => {
		console.info(`Database connected successfully`);
	})
	.catch((err) => {
		console.error("Database connection error:", err);
		process.exit(1);
	});

// app.use("/v1/countries", require("./routes/countries.js"));
// app.use("/v1/payments", require("./routes/payments.js"));
// app.use("/v1/subscriptions", require("./routes/subscriptions.js"));
// app.use("/v1/users", require("./routes/users.js"));
// app.use("/v1/contact", require("./routes/contactRequests.js"));

app.use("/v1/migrations", require("./routes/migrations.js"));
app.use("/v1/bot-chats", require("./routes/botChats.js"));

app.get("/", (req, res) => res.send("Welcome to the server"));
app.get("/v1", (req, res) => res.send("You are now accessing API version:1"));

// Error handling middleware
// app.use((err, req, res, next) => {
// 	if (err instanceof multer.MulterError) {
// 		return sendJsonResponse(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Multer Error", err.message);
// 	} else if (err) {
// 		return sendJsonResponse(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "An error occurred", err.message);
// 	}

// 	console.error(err);
// 	next();
// });

server.listen(PORT, () => {
	console.info(`Server running on http://localhost:${PORT}`);
	console.info(`Environment: ${process.env.ENVIRONMENT_STATUS}`);
});
