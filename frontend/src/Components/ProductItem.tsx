import { Link } from "react-router-dom";
import { Product } from "../Types/Product";
import { Button, Card } from "react-bootstrap";
import { Rate } from "antd";

const ProductItem = ({ products }: { products: Product }) => {
  return (
    <Card>
      <Link to={`/product/${products.slug}`}>
        <img src={products.image} alt="" className="product-image" />
      </Link>
      <Card.Body>
        <Card.Title>{products.name}</Card.Title>
        <Rate disabled value={products.rating} />
        <Card.Text>
          <p className="text-warning">{products.numReviews} reviews</p>
          <p>${products.price}</p>
        </Card.Text>
        {products.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
};
export default ProductItem;
