import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { productModel } from "../Models/ProductModel";
import { sampleProducts, sampleUsers } from "../data";
import { userModel } from "../Models/userModel";

export const seedRouter = express.Router();
seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    await productModel.deleteMany({});
    const createdProducts = await productModel.insertMany(sampleProducts);

    await userModel.deleteMany({});
    const createdUser = await userModel.insertMany(sampleUsers);
    res.json({ createdProducts, createdUser });
  }),
);
