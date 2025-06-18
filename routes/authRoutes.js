const express = require("express");
const {
  handleSignup,
  handleSignin,
  handleFogotPassword,
  handleResetPassword,
} = require("../controllers/authController");
const {
  AuthSignup,
  loginValidation,
  auth,
  forgotPasswordValidate,
  resetPasswordValidate,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", AuthSignup, handleSignup);

router.post("/signin", loginValidation, handleSignin);

router.post("/signin", auth, forgotPasswordValidate, handleFogotPassword);

router.post("/signin", auth, resetPasswordValidate, handleResetPassword);

module.exports = router;
