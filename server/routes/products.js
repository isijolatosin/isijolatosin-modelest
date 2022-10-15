const express = require("express");
const router = express.Router();

// Products
const {
	getAllProducts,
	createProduct,
	getProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/products");
router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

// Images
const {
	uploadProductImage,
	uploadProductImageMult,
} = require("../controllers/uploadsController");
router.route("/uploadSingle").post(uploadProductImage);
router.route("/uploadMultiple").post(uploadProductImageMult);

module.exports = router;
