const jwt = require("jsonwebtoken");
const joi = require("joi");
const User = require("../models/userModel");

const validateSignup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = [];

  if (!name) {
    errors.push("Provide your name");
  }

  if (!email) {
    errors.push("Provide your email");
  }

  if (!password) {
    errors.push("Provide your password");
  }

  if (errors.length > 0) {
    return res.status(200).json({ message: errors });
  }

  const signupSchema = joi.object({
    name: joi
      .string()
      .required(),

    email: joi
      .string()
      .required()
      .min(4)
      .max(60)
      .pattern(new RegExp("^[^@]+@[^@]+.[^@]+$"))
      .messages({
        "string.pattern.base":
          "Please enter a valid email address (e.g., name@example.com).",
        "string.email": "Please enter a valid email address.",
      }),

    password: joi
      .string()

      .required()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        )
      )
      .messages({
        "string.pattern.base":
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      }),
  });

  const { error } = signupSchema.validate({ name, email, password });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push("Provide your email");
  }

  if (!password) {
    errors.push("Provide your password");
  }

  if (errors.length > 0) {
    return res.status(200).json({ message: errors });
  }

  next();
};

const auth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Incorrect details" });
  }

  const splitToken = token.split(" ");

  const realToken = splitToken[1];

  const decoded = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`);

  if (!decoded) {
    return res.status(401).json({ message: "Access denied" });
  }

  const user = await User.findOne({ email: decoded?.email });

  if (!user) {
    return res.status(401).json({ message: "Authorized access" });
  }

  req.user = user;

  next();
};

const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden. Admin only" });
  }
};

const validateForgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const errors = [];

  if (!email) {
    errors.push("Email is required");
  }

  if (errors.length > 0) {
    return res.status(200).json({ message: errors });
  }

  next();
};
const validateResetPassword = async (req, res, next) => {
  const { password } = req.body;

  const errors = [];

  if (!password) {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return res.status(200).json({ message: errors });
  }

  next();
};

const validateOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  const errors = [];

  if (!email) {
    errors.push("provide your email");
  }

  if (!otp) {
    errors.push("provide your OTP");
  }

  if (errors.length > 0) {
    return res.status(200).json({ message: errors });
  }

  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  auth,
  isAdmin,
  validateForgotPassword,
  validateResetPassword,
  validateOTP,
};
