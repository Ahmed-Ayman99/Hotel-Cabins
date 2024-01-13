import mongoose from "mongoose";

const settingSchema = mongoose.Schema({
  minBookingLength: {
    type: Number,
    required: [true, "must have minBookingLength"],
  },
  maxBookingLength: {
    type: Number,
    required: [true, "must have maxBookingLength"],
  },
  maxGuestsPerBooking: {
    type: Number,
    required: [true, "must have maxGuestsPerBooking"],
  },
  breakFastPrice: {
    type: Number,
    required: [true, "must have breakFastPrice"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Settings = mongoose.model("Settings", settingSchema);

export default Settings;
