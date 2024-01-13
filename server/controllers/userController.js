import multer from "multer";
import sharp from "sharp";

import createToken from "../utils/createToken.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import User from "../models/user.js";

export const getUser = catchAsync(async (req, res, next) => {
  const id = req.user?.id || req.params.id;

  const token = req.token ? req.token : null;

  const user = await User.findById(id);

  res.status(200).json({
    status: "success",
    data: user,
    token,
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    next(new AppError("Tou can't update password here", 400));

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    user,
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const correct = await user.matchPassword(
    req.body.currentPassword,
    user.password
  );

  if (!correct)
    return next(new AppError("Your current password is wrong", 401));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  user.password = undefined;
  const token = createToken(res, user.id);

  res.status(201).json({
    status: "success",
    token,
    user,
  });
});

// Multer
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    return cb(null, true);
  }

  cb(new AppError("Not an image! Please upload only image", false));
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single("photo");

// Sharp Resize images
export const resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `users-${Date.now()}.jpeg`;
  req.body.photo = req.file.filename;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/users/${req.file.filename}`);

  next();
});
