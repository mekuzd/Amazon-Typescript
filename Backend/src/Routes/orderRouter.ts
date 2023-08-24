import express, { Request, Response } from "express";
export const orderRouter = express.Router();
import asyncHandler from "express-async-handler";
import { Auth } from "../Midddleware/Auth";
import { OrderModel } from "../Models/orderModel";
import { Product } from "../Models/ProductModel";

orderRouter.post(
  "/",
  Auth,
  asyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const createdOrder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id, // added product field to each item in orderItems a ref to each product
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      res.status(201).send({ message: "Order Not Found", order: createdOrder });
    }
  }),
);
