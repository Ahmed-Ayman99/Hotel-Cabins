import mongoose from "mongoose";

const cabinSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, " "],
    unique: true,
    trim: true,
  },
  maxCapacity: {
    type: Number,
    required: [true, "A cabin must have a group size"],
    min: 1,
  },
  price: {
    type: Number,
    required: [true, "A cabin must have a price"],
  },
  discount: {
    type: Number,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
});

const Cabin = mongoose.model("Cabin", cabinSchema);

export default Cabin;
