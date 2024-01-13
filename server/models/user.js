import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpeg",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "guide", "lead-guide", "admin"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.methods.changePasswordAfter = function (iat) {
  if (this.passwordChangedAt) {
    const changedTimesamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return iat < changedTimesamp;
  }
  return false;
};

userSchema.methods.matchPassword = async function (
  enteredPassword,
  newPassword
) {
  return await bcrypt.compare(enteredPassword, newPassword);
};
// Document MDW
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;

    if (!this.isNew) this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
