import express from "express";
import morgan from "morgan";
import cors from "cors";

import hpp from "hpp";
import xss from "xss-clean";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

import userRoutes from "./routes/userRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";
import cabinRoutes from "./routes/cabinRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import errorController from "./controllers/errorController.js";

const app = express();

app.use("/public", express.static("./public"));
app.use(express.json({ limit: "10kb" }));
app.use(
  cors({
    credentials: true,
  })
);
app.options("*", cors());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
//_________ protection MDW _________

app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: ["status", "price"],
  })
);

app.use("/api/setting", settingRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/cabins", cabinRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/user", userRoutes);

app.all("*", (req, _, next) => {
  const err = new Error(`Can't Find ${req.originalUrl}`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use(errorController);

export default app;
