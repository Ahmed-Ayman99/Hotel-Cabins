import Booking from "../models/booking.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllBooking = catchAsync(async (req, res, next) => {
  let { query } = new ApiFeatures(Booking.find(), req.query)
    .sort()
    .filter()
    .limitFields();

  const count = await Booking.countDocuments(query);
  const { query: query2 } = new ApiFeatures(query, req.query).paginate();

  const booking = await query2
    .populate({
      path: "guest",
    })
    .populate({
      path: "cabin",
    });

  res.status(200).json({
    status: "success",
    length: booking.length,
    count: count,
    data: booking,
  });
});

export const getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate({
      path: "cabin",
    })
    .populate({
      path: "guest",
    });

  res.status(200).json({
    status: "success",
    data: booking,
  });
});

export const createBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.create(req.body);

  res.status(201).json({
    status: "success",
    data: booking,
  });
});

export const updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate({
      path: "cabin",
    })
    .populate({
      path: "guest",
    });

  res.status(201).json({
    status: "success",
    data: booking,
  });
});

export const deleteBooking = catchAsync(async (req, res, next) => {
  await Booking.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    data: null,
  });
});

export const getBookingsAfterDate = catchAsync(async (req, res, next) => {
  const { days } = req.query;

  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);

  const bookings = await Booking.find({
    createdAt: { $gte: pastDate, $lt: today },
  });

  res.status(200).json({
    status: "success",
    length: bookings.length,
    data: bookings,
  });
});

export const getSaysAfterDate = catchAsync(async (req, res, next) => {
  const { days } = req.query;

  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);

  const bookings = await Booking.find({
    createdAt: { $gte: pastDate, $lt: today },
    status: {
      $ne: "unconfirmed",
    },
  });

  res.status(200).json({
    status: "success",
    length: bookings.length,
    data: bookings,
  });
});

export const getActivities = catchAsync(async (req, res, next) => {
  const { days } = req.query;

  const today = new Date();
  today.setHours(today.getDate() - days);
  today.setHours(0, 0, 0, 0);

  const bookings = await Booking.find({
    endDate: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000 * days),
    },
    status: {
      $in: ["checked-in", "unconfirmed"],
    },
  })
    .populate({
      path: "guest",
    })
    .populate({
      path: "cabin",
    });

  res.status(200).json({
    status: "success",
    length: bookings.length,
    data: bookings,
  });
});
