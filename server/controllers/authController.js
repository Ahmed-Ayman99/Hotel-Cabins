import { promisify } from "util";
import JWT from "jsonwebtoken";

import createToken from "../utils/createToken.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import User from "../models/user.js";

export const login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email }).select("+password +active");
  if (!user) return next(new AppError("You are not have account please sinup"));

  const correct = user && (await user.matchPassword(password, user.password));

  if (!correct) return next(new AppError("Incorrect Password"));

  const token = createToken(res, user.id);
  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

export const logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: new Date(Date.now() + 10 * 1000),
  });

  res.status(200).json({ status: "success" });
});

export const register = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  user.password = undefined;

  const token = createToken(res, user.id);

  res.status(201).json({
    status: "success",
    token,
    user,
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  const authExist =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");

  const errorsMsgs = {
    userBelonging: "The user belonging to this token does no longer exist.",
    userNotlogged: "You are not logged in! Please log in to get access.",
    userNoExist: "the user has no longest exist",
  };

  if (req.cookies?.jwt) token = req.cookies.jwt;
  if (authExist) token = req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError(errorsMsgs.userNotlogged, 401));

  const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) return next(new AppError(errorsMsgs.userBelonging, 401));
  if (currentUser.changePasswordAfter(decoded.iat))
    return next(new AppError(errorsMsgs.userNoExist, 401));

  req.user = currentUser;
  next();
});
