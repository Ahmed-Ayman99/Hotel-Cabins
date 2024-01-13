import express from "express";

import {
  getUser,
  resizePhoto,
  updateMe,
  updatePassword,
  uploadUserPhoto,
} from "../controllers/userController.js";

import {
  login,
  logout,
  protect,
  register,
} from "../controllers/authController.js";

const userRoutes = express.Router();

userRoutes.route("/login").post(login);
userRoutes.route("/register").post(register);
userRoutes.route("/logout").get(logout);

userRoutes.use(protect);

userRoutes.patch("/updatePassword", updatePassword);
userRoutes.patch("/updateMe", uploadUserPhoto, resizePhoto, updateMe);
userRoutes.route("/:id").get(getUser);
userRoutes.route("/me").get(getUser);

export default userRoutes;
