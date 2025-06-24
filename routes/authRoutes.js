const express = require("express");
const {
  handleSignup,
  handleSignin,
  handleFogotPassword,
  handleResetPassword,
  handleVerifyOtp,
} = require("../controllers/authController");
const {
  validateSignup,
  validateLogin,
  auth,
  validateForgotPassword,
  validateResetPassword,
  validateOTP,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", validateSignup, handleSignup);

router.post("/signin", validateLogin, handleSignin);

router.post("/forgotten-password", validateForgotPassword, auth, handleFogotPassword);

router.patch("/reset-password", validateResetPassword, auth, handleResetPassword);

router.post("/verify-otp", validateOTP, auth, handleVerifyOtp);

module.exports = router;
