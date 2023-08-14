import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { sampleProducts } from "./data";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
const port = 5000;
dotenv.config();

const MONGODB_URI = process.env.MONGO_URI;
mongoose.set("strictQuery", true);

app.use(cors({ origin: ["http://localhost:3000"] }));

app.get("/api/products", (req: Request, res: Response) => {
  res.json(sampleProducts);
});
app.get("/api/products/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;
  res.json(sampleProducts.find((product) => product.slug === slug));
});

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
