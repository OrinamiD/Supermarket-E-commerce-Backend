

const express = require("express")
const { auth, isAdmin } = require("../middleware/authMiddleware")
const { validateProduct, validateUpdateProductPrice } = require("../middleware/productMiddleware")
const { handleProduct, handleGetAllProducts, handleGetOneProduct, handleUpdateProductPrice } = require("../controllers/productController")

const router = express.Router()

router.post("/add-product", auth, isAdmin, validateProduct, handleProduct)

router.get("/all-products", auth, handleGetAllProducts)

router.get("/one-product", auth, handleGetOneProduct)

router.patch("/update-prduct-price", auth, isAdmin, validateUpdateProductPrice, handleUpdateProductPrice  )


module.exports = router