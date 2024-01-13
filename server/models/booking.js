import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDate: {
      type: Date,
      default: Date.now(),
    },
    endDate: {
      type: Date,
      default: Date.now() + 1000 * 60 * 60 * 60 * 30,
    },
    numNights: {
      type: Number,
    },
    numGuests: {
      type: Number,
    },
    status: {
      type: String,
    },

    hasBreakfast: {
      type: Boolean,
    },
    isPaid: {
      type: Boolean,
    },
    Observations: {
      type: String,
    },
    cabinPrice: {
      type: Number,
    },
    extraPrice: {
      type: Number,
    },
    cabin: {
      type: mongoose.Schema.ObjectId,
      ref: "Cabin",
    },
    guest: {
      type: mongoose.Schema.ObjectId,
      ref: "Guest",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingSchema.virtual("totalPrice").get(function () {
  return this.cabinPrice + this.extraPrice;
});

bookingSchema.index({ status: 1 });
bookingSchema.index({ cabin: 1, guest: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
