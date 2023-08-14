import express, { Request, Response } from "express";
export const productRouter = express.Router();
import asyncHandler from "express-async-handler";
import { productModel } from "../Models/ProductModel";

productRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const products = await productModel.find({});
    res.json(products);
  }),
);

productRouter.get(
  "/:slug",
  asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const product = await productModel.findOne({ slug: slug });
    if (!product) {
      res.status(404).json({ message: "product not found" });
    } else {
      res.json(product);
    }
  }),
);
