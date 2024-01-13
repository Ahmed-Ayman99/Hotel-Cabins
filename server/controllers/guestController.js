import Booking from "../models/booking.js";
import Guest from "../models/guest.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllGuests = catchAsync(async (req, res, next) => {
  const guests = await Guest.find();

  res.status(201).json({
    status: "success",
    data: guests,
  });
});

export const createGuest = catchAsync(async (req, res, next) => {
  const guest = await Guest.create(req.body);

  res.status(201).json({
    status: "success",
    data: guest,
  });
});
