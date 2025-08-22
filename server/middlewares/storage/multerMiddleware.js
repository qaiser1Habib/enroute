const multer = require("multer");

const multerMiddleware = () => {
	const storage = multer.memoryStorage();
	const upload = multer({
		storage: storage,
		limits: {
			fileSize: 1000 * 1024 * 1024, // 1GB file size limit
			fieldSize: 1000 * 1024 * 1024, // 1GB field size limit
			// fields: 10, // Limit the number of fields
			// files: 10, // Limit the number of files
		},
	});
	return upload.any(); // Allow any number of fields/files
};

module.exports = multerMiddleware;
