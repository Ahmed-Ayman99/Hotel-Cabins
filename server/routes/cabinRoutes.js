import express from "express";

import { protect } from "../controllers/authController.js";

import {
  createCabin,
  deleteCabin,
  getAllCabins,
  resizeCabinPhoto,
  updateCabin,
  uploadCabinPhoto,
} from "../controllers/cabinController.js";

const cabinRoutes = express.Router();

cabinRoutes.use(protect);

cabinRoutes
  .route("/")
  .get(getAllCabins)
  .post(uploadCabinPhoto, resizeCabinPhoto, createCabin);

cabinRoutes
  .route("/:id")
  .patch(uploadCabinPhoto, resizeCabinPhoto, updateCabin)
  .delete(deleteCabin);

export default cabinRoutes;
