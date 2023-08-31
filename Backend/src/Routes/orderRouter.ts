import express, { Request, Response } from "express";
export const orderRouter = express.Router();
import asyncHandler from "express-async-handler";
import { Auth } from "../Midddleware/Auth";
import { OrderModel } from "../Models/orderModel";
import { Product } from "../Models/ProductModel";

orderRouter.get(
  "/:id",
  Auth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  }),
);

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
          product: x._id, // added product field to each item in orderItems, a ref to each productModel
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

// update Payment status and save user payment Result from paypal
orderRouter.put(
  "/:id/pay",
  Auth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      order.paymentResult = {
        // paypal
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();

      res.send({ order: updatedOrder, message: "order paid successfully" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  }),
);
