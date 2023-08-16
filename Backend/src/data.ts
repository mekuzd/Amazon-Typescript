import { Product } from "./Models/ProductModel";
import { User } from "./Models/userModel";
import bcrypt from "bcryptjs";
export const sampleProducts: Product[] = [
  {
    name: "Nike Slim shirt",
    slug: "Nike Slim shirt",
    image: "../images/p1.jpg",
    category: "Shirts",
    price: 120,
    countInStock: 10,
    brand: "Nike",
    rating: 4.5,
    numReviews: 10,
    description: "high quality Shirt",
  },
  {
    name: "Addidas fit shirt",
    slug: "Addidas fit shirt",
    image: "../images/p2.jpg",
    category: "Shirts",
    price: 100,
    countInStock: 20,
    brand: "Addidas",
    rating: 4.0,
    numReviews: 10,
    description: "high quality product",
  },
  {
    name: "Lacoste free pants",
    slug: "Lacoste free pants",
    image: "../images/p3.jpg",
    category: "Pants",
    price: 220,
    countInStock: 10,
    brand: "Lacoste",
    rating: 4.8,
    numReviews: 17,
    description: "high quality Product",
  },
  {
    name: "Nike slim pants",
    slug: "Nike slim pants",
    image: "../images/p4.jpg",
    category: "Pants",
    price: 78,
    countInStock: 15,
    brand: "nike",
    rating: 4.5,
    numReviews: 14,
    description: "high quality Product",
  },
];

export const sampleUsers: User[] = [
  {
    name: "joe",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: true,
  },
  {
    name: "john",
    email: "user@example.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: false,
  },
];
