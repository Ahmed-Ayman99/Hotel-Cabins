import Settings from "../models/setting.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllSettings = catchAsync(async (req, res, next) => {
  const settings = await Settings.findOne();

  res.status(200).json({
    status: "success",
    length: settings.length,
    data: settings,
  });
});

export const createSetting = catchAsync(async (req, res, next) => {
  const setting = await Settings.create({
    minBookingLength: req.body.minBookingLength,
    maxBookingLength: req.body.maxBookingLength,
    maxGuestsPerBooking: req.body.maxGuestsPerBooking,
    breakFastPrice: req.body.breakFastPrice,
  });

  res.status(200).json({
    status: "success",
    data: setting,
  });
});

export const updateSetting = catchAsync(async (req, res, next) => {
  const setting = await Settings.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: setting,
  });
});
