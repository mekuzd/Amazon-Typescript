import express, { Request, Response } from "express";
import { sampleProducts } from "./data";
const app = express();
import cors from "cors";
const port = 5000;
app.use(cors());
app.get("/api/products", (req: Request, res: Response) => {
  res.json(sampleProducts);
});
app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
