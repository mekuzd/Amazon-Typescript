import express from "express";
import dotenv from "dotenv";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import { productRouter } from "./Routes/productRouter";
import { seedRouter } from "./Routes/seedRouter";
const port = 5000;
dotenv.config();

const MONGODB_URI = process.env.MONGO_URI;
mongoose.set("strictQuery", true);

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use("/api/products", productRouter);
app.use("/api/seed", seedRouter);

async function start() {
  try {
    await mongoose.connect(MONGODB_URI!);
    app.listen(port, () => {
      console.log(`app listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
