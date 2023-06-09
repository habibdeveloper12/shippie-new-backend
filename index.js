import express from "express";
import { APP_PORT, DB_URL } from "./config/index.js";
import errorHandler from "./middlewares/errorHandler.js";
const app = express();
import routes from "./routes/index.js";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import fallback from "express-history-api-fallback";

// Database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected...");
});

global.appRoot = path.resolve("./");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

app.use(errorHandler);
const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
