import { Helmet } from "react-helmet-async";
import { useEffect, useReducer } from "react";
import { convertProductToCartItem, getError } from "../utils";
import { reducer } from "../Reducer";
import { useContext } from "react";
import { State } from "../Types/state";
import { Action } from "../Types/Action";
import { initialState } from "./Hompage";
import apiClient from "../Services/apiClient";
import { ApiError } from "../Types/apiError";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Message from "../Components/Message";
import DefaultLayout from "../Components/DefaultLayout";
import { Rate } from "antd";
import { Store } from "../Provider/Store";
import { toast } from "react-toastify";

const Product = () => {
  const { slug } = useParams();
  const [{ product, loading, error }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);
  const navigate = useNavigate();
  const { state, dispatch: Dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // add item to cart
  const addToCartHandler = () => {
    const existingItem = cartItems.find((items) => items._id === product._id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1; // if item exist increase quantity else make quantity 1
    if (product.countInStock! < quantity) {
      toast.warn("sorry! Product is out of stock");
      return;
    }
    Dispatch({
      type: "ADD_TO_CART",
      payload: { ...convertProductToCartItem(product), quantity },
    });
    navigate("/cart");
  };
  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await apiClient.get(`/api/products/${slug}`);
        dispatch({ type: "FETCH_PRODUCT", payload: result.data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error as ApiError),
        });
      }
    };
    fetchProduct();
  }, []);
  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : !product ? (
    <Message variant="danger">no product found</Message>
  ) : (
    <div>
      <DefaultLayout>
        <div className="p-4">
          <Row>
            <Col md={6}>
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rate disabled value={product.rating} />
                  <span className="text-warning mx-2 text-bold">
                    {product.numReviews} Reviews
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>Price : ${product!.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock ? (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button variant="primary" onClick={addToCartHandler}>
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ) : (
                      ""
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </DefaultLayout>
    </div>
  );
};
export default Product;
