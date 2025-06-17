

const express = require("express")
const { handleSignup } = require("../controllers/authController")
const { AuthSignup } = require("../middleware/authMiddleware")

const router = express.Router()



router.post("/signup", AuthSignup, handleSignup)


module.exports = router
