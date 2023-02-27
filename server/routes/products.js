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

module.exports = router;
