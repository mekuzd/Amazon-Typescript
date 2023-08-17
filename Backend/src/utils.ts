import jwt from "jsonwebtoken";
import { User } from "./Models/userModel";

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isadmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "30d" },
  );
};
