

const express = require("express")
const { auth, isAdmin } = require("../middleware/authMiddleware")
const { validateProduct } = require("../middleware/productMiddleware")
const { handleProduct, handleGetAllProducts, handleGetOneProduct } = require("../controllers/productController")

const router = express.Router()

router.post("/add-product", auth, isAdmin, validateProduct, handleProduct)

router.get("/all-products", auth, handleGetAllProducts)

router.get("/one-product", auth, handleGetOneProduct)


module.exports = router