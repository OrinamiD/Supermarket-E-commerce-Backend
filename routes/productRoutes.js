

const express = require("express")
const { auth, isAdmin } = require("../middleware/authMiddleware")
const { validateProduct } = require("../middleware/productMiddleware")
const { handleProduct } = require("../controllers/productController")

const router = express.Router()

router.post("/add-product", auth, isAdmin, validateProduct, handleProduct)


module.exports = router