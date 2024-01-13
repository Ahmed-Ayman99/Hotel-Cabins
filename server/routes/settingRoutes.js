import express from "express";

import {
  createSetting,
  getAllSettings,
  updateSetting,
} from "../controllers/settingController.js";

import { protect } from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllSettings).post(createSetting);
router.route("/:id").patch(updateSetting);

export default router;
