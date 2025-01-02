import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/books.routes.js";
import conncectDB from "./database/db.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/books", router);

conncectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

// rahan WGJ82n249vM8OaAD
