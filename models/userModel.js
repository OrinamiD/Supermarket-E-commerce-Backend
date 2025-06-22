const { boolean } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String },

    name: {
      type: String,
      trim: true,
      require: [true, "name is required"],
    },

    email: {
      type: String,
      trim: true,
      require: [true, "email is required"],
      unique: [true, "email must be unique"],
      minLength: 3,
      maxLength: 60,
    },

    password: {
      type: String,
      trim: true,
      require: [true, "password is required"],
    },

    OtpCode: {
      OTP: { type: String },
      verified: { type: Boolean },
      expiresAt: { type: Date },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
