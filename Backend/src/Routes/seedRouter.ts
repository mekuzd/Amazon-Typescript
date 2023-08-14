import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { productModel } from "../Models/ProductModel";
import { sampleProducts } from "../data";

export const seedRouter = express.Router();
seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    await productModel.deleteMany({});
    const createdProducts = await productModel.insertMany(sampleProducts);
    res.json(createdProducts);
  }),
);
