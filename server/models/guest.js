import mongoose from "mongoose";

const guestSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "A Guest must have number of fullName"],
  },
  email: {
    type: String,
    required: [true, "A Guest must have number of email"],
  },
  nationality: {
    type: String,
    required: [true, "A Guest must have number of nationality"],
  },
  nationalID: {
    type: String,
    required: [true, "A Guest must have number of nationalID"],
  },
  countryFlag: {
    type: String,
    required: [true, "A Guest must have number of countryFlag"],
  },
});

const Guest = mongoose.model("Guest", guestSchema);

export default Guest;
