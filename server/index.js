import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload"; // thisplagin gives opportunity of uploading file to server

import authRoute from "./routes/auth.js";
import recipeRoute from "./routes/recipes.js";
import commentRoute from "./routes/comments.js";

const app = express();
dotenv.config();

// consts
const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("uploads")); // folder uploads - we show to express where to load and keep static files

// routes
// http://localhost:3002 + /api/auth + /login
app.use("/api/auth", authRoute);
app.use("/api/recipes", recipeRoute);
app.use("/api/comments", commentRoute);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.fbmjnqk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster1`
    );

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}

start();

