import express from "express";

import { createGuest, getAllGuests } from "../controllers/guestController.js";
import { protect } from "../controllers/authController.js";

const guestRoutes = express.Router();

guestRoutes.use(protect);
guestRoutes.route("/").get(getAllGuests).post(createGuest);

export default guestRoutes;
