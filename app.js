import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import postRoutes from "./routes/routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const db_uri = process.env.DB_URI;

app.use(
  cors({
    origins: [
      "http://localhost:8080",
      "localhost:5173",
      "https://mevn-client.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

connectDB(db_uri);

app.use("/api/posts", postRoutes);

// for prodction
if (process.env.NODE === "production") {
  app.use(express.static(__dirname + "/dist/"));
  app.use("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
}

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
