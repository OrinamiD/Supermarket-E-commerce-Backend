const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const sendRegistrationEmail = require("../sendEmails/registrationEmail");
const sendForgotPasswordEmail = require("../sendEmails/forgotPasswordEmail");

// registration
const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exist, please login" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    const result = await newUser.save();

    result.password = undefined;

    await sendRegistrationEmail(name, email, password);

    return res.status(200).json({ message: "Registration successful", result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// login
const handleSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }

    const ismatch = await bcrypt.compare(password, user?.password);

    if (!ismatch) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }

    const accessToken = jwt.sign(
      { email: user?.email, role: user?.role, name: user?.name },
      process.env.ACCESS_TOKEN,
      { expiresIn: "3d" }
    );
    const refreshToken = jwt.sign(
      { email: user?.email, role: user?.role, name: user?.name },
      process.env.REFRESH_TOKEN,
      { expiresIn: "6d" }
    );

    return res.status(200).json(
      {
        message: "logged in successfully",
        email: user?.email,
        name: user?.name,
        userId: user?._id,
        accessToken,
      },

      refreshToken
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// forgot password
const handleFogotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User account not found" });
    }

    // send mail with token

    const otp = Math.floor(1000000 + Math.random() * 9000000).toString(); // Always 7-digit
    const hashOTP = await bcrypt.hash(otp, 12);

    user.OtpCode = {
      OTP: hashOTP,
      verified: false,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 min

    };
    await user.save();

    const accessToken = jwt.sign(
      { email: req.user?.email, role: req.user?.role, name: req.user?.name },
      process.env.ACCESS_TOKEN,
      { expiresIn: "3m" }
    );

    await sendForgotPasswordEmail(email, accessToken, otp);

    return res.status(200).json({ messsage: "check your email", accessToken });
  } catch (error) {
    return res.status(200).json({ messsage: error.message });
  }
};

// reset password
const handleResetPassword = async (req, res) => {
  const { password } = req.body;

  try {
    console.log(req.user);

    const user = await User.findOne({ email: req.user?.email });

    if (!user) {
      return res.status(400).json({ message: "user do not exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    const newUser = user.save();

    newUser.password = undefined;

    const accessToken = jwt.sign(
      {
        email: req.user?.email,
        role: req.user?.role,
        name: req.user?.name,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "3m" }
    );

    const refreshToken = jwt.sign(
      {
        email: req.user?.email,
        role: req.user?.role,
        name: req.user?.name,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "6d" }
    );

    return res.status(200).json(
      {
        message: "Password changed successfully",

        newUser,

        accessToken,
      },

      refreshToken
    );
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

// verify OTP
const handleVerifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || !user.otp) {
      return res.status(404).json({ message: "Invalid OTP" });
    }

    const isValid = await bcrypt.compare(otp, user.otp);

    if (!isValid) {
      return res.status(400).json({ message: "unauthorized prompt" });
    }

    const isExpired = user.OtpCode.expiresAt < new Date();

    if (isExpired) {
      return res.status(400).json({ message: "Expired OTP" });
    }

    user.OtpCode.verified = true;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleSignup,
  handleSignin,
  handleFogotPassword,
  handleResetPassword,
  handleVerifyOtp,
};
