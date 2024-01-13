import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

app.listen(process.env.PORT || 6000, () =>
  console.log(`App is running on port ${process.env.PORT}`)
);
