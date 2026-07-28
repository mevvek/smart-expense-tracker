const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Email verification status
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Verification token
    verificationToken: {
      type: String,
      default: null,
    },

    // Verification token expiry
    verificationTokenExpires: {
      type: Date,
      default: null,
    },

    // Forgot Password token
    resetPasswordToken: {
      type: String,
      default: null,
    },

    // Forgot Password token expiry
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);