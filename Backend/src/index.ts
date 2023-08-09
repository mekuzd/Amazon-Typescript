import express, { Request, Response } from "express";
import { sampleProducts } from "./data";
const app = express();
const port = 5000;
app.get("/api/products", (req: Request, res: Response) => {
  res.json(sampleProducts);
});
app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
