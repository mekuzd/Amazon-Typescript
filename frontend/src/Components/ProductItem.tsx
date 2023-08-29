import { Link } from "react-router-dom";
import { Product } from "../Types/Product";
import { Button, Card } from "react-bootstrap";
import { Rate } from "antd";
import { useContext } from "react";
import { Store } from "../Provider/Store";
import { CartItem } from "../Types/Cart";
import { convertProductToCartItem } from "../utils";
const ProductItem = ({ products }: { products: Product }) => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // add item to cart
  const addToCartHandler = (item: CartItem) => {
    const existingItem = cartItems.find((items) => items._id === products._id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1; // if item exist increase quantity else make quantity 1
    if (products.countInStock! < quantity) {
      return alert("sorry! Product is out of stock");
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
  };

  return (
    <Card className="m-1">
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
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(products))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
export default ProductItem;
