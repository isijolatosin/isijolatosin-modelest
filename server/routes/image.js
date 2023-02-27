const express = require("express");
const router = express.Router();

// Images
const {
	uploadProductImage,
	uploadProductImageMult,
} = require("../controllers/uploadsController");
router.route("/uploadMultiple").post(uploadProductImageMult);
router.route("/uploadSingle").post(uploadProductImage);

module.exports = router;
