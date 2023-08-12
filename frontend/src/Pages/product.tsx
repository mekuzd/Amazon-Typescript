import { Helmet } from "react-helmet-async";
import { useEffect, useReducer } from "react";
import { getError, reducer } from "../utils";
import { State } from "../Types/state";
import { Action } from "../Types/Action";
import { initialState } from "./Hompage";
import apiClient from "../Services/apiClient";
import { ApiError } from "../Types/apiError";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Message from "../Components/Message";
import DefaultLayout from "../Components/DefaultLayout";
import { Rate } from "antd";

const Product = () => {
  const { slug } = useParams();
  const [{ product, loading, error }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);

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
        <div className="p-5">
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
                  <p className="text-warning">{product.numReviews} Reviews</p>
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
                          <Button variant="primary">Add to Cart</Button>
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
