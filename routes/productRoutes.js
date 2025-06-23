const express = require("express");
const { auth, isAdmin } = require("../middleware/authMiddleware");
const {
  validateProduct,
  validateUpdateProductPrice,
} = require("../middleware/productMiddleware");
const {
  handleAddNewProduct,
  handleGetAllProducts,
  handleGetOneProduct,
  handleUpdateProductPrice,
} = require("../controllers/productController");

const router = express.Router();

router.post(
  "/add-product",
  validateProduct,
  auth,
  isAdmin,
  handleAddNewProduct
);

router.get("/all-products", auth, handleGetAllProducts);

router.get("/one-product", auth, handleGetOneProduct);

router.patch(
  "/update-product-price",
  validateUpdateProductPrice,
  auth,
  isAdmin,
  handleUpdateProductPrice
);

module.exports = router;
