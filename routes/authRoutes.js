

const express = require("express")
const { handleSignup, handleSignin, handleFogotPassword, handleResetPassword} = require("../controllers/authController")
const { AuthSignup, loginValidation, auth} = require("../middleware/authMiddleware")

const router = express.Router()



router.post("/signup", AuthSignup, handleSignup)

router.post("/signin", loginValidation, handleSignin)

router.post("/signin", auth, handleFogotPassword)

router.post("/signin", auth, handleResetPassword)





module.exports = router
