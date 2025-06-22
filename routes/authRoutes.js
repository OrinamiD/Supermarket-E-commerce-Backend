const express = require("express");
const {
  handleSignup,
  handleSignin,
  handleFogotPassword,
  handleResetPassword,
  handleVerifyOtp,
} = require("../controllers/authController");
const {
  AuthSignup,
  loginValidation,
  auth,
  forgotPasswordValidate,
  resetPasswordValidate,
  validateOTP,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", AuthSignup, handleSignup);

router.post("/signin", loginValidation, handleSignin);

router.post("/signin", forgotPasswordValidate, auth,handleFogotPassword);

router.post("/signin", resetPasswordValidate, auth,handleResetPassword);

router.post("/verify-otp", validateOTP, auth, handleVerifyOtp)


module.exports = router;
