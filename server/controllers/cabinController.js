import multer from "multer";
import sharp from "sharp";

import catchAsync from "../utils/catchAsync.js";
import Cabin from "../models/cabin.js";

// Multer MDW
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    return cb(null, true);
  }

  cb(new Error("Not an image! Please upload only image", true));
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadCabinPhoto = upload.single("image");

export const resizeCabinPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `cabin-${Date.now()}.jpeg`;
  req.body.image = req.file.filename;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/cabins/${req.file.filename}`);

  next();
});

export const getAllCabins = catchAsync(async (req, res, next) => {
  const cabins = await Cabin.find();

  res.status(200).json({
    status: "success",
    length: cabins.length,
    data: cabins,
  });
});

export const createCabin = catchAsync(async (req, res, next) => {

  const cabin = await Cabin.create(req.body);

  res.status(200).json({
    status: "success",
    data: cabin,
  });
});

export const updateCabin = catchAsync(async (req, res, next) => {
  const cabin = await Cabin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: cabin,
  });
});

export const deleteCabin = catchAsync(async (req, res, next) => {
  await Cabin.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});
