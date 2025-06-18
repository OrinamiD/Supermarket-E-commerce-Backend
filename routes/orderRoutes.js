

const express = require("express")
const { auth } = require("../middleware/authMiddleware")
const { handleOrder } = require("../controllers/orderController")

const router = express.Router()

router.post("place-an-order", auth, handleOrder)

module.exports = router