const express = require("express");

const { installSampleDB } = require("../controllers/migrations.js");

const router = express.Router();

router.get("/install-all", installSampleDB);

module.exports = router;
