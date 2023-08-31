import express from "express";
import dotenv from "dotenv";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import { productRouter } from "./Routes/productRouter";
import { seedRouter } from "./Routes/seedRouter";
import { userRouter } from "./Routes/userRouter";
import { orderRouter } from "./Routes/orderRouter";
import { keyRouter } from "./Routes/keyRouter";
const port = 5000;
dotenv.config();

const MONGODB_URI = process.env.MONGO_URI;
mongoose.set("strictQuery", true);

app.use(cors({ origin: ["http://localhost:3000"] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRouter);
app.use("/api/seed", seedRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/keys", keyRouter);

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
