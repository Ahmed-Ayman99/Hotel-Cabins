import express from "express";

import { protect } from "../controllers/authController.js";

import {
  createBooking,
  deleteBooking,
  getAllBooking,
  getBooking,
  getBookingsAfterDate,
  getSaysAfterDate,
  getActivities,
  updateBooking,
} from "../controllers/bookingController.js";

const bookingRoutes = express.Router();

bookingRoutes.use(protect);

bookingRoutes.route("/bookingsAfterDate").get(getBookingsAfterDate);
bookingRoutes.route("/staysAfterDate").get(getSaysAfterDate);
bookingRoutes.route("/getActivities").get(getActivities);

bookingRoutes
  .route("/:id")
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

bookingRoutes.route("/").get(getAllBooking).post(createBooking);

export default bookingRoutes;
