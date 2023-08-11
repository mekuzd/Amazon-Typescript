import express, { Request, Response } from "express";
import { sampleProducts } from "./data";
const app = express();
import cors from "cors";
const port = 5000;
app.use(cors());
app.get("/api/products", (req: Request, res: Response) => {
  res.json(sampleProducts);
});
app.get("/api/products/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;
  res.json(sampleProducts.find((product) => product.slug === slug));
});

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
