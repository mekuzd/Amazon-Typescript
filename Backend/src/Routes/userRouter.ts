import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { userModel } from "../Models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils";
export const userRouter = express.Router();

userRouter.post(
  "/signin",
  asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);

    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(402).json({ message: "Invalid email or password" });
  }),
);
