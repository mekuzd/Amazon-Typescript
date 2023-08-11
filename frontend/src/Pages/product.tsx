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
import { Col, Row } from "react-bootstrap";
import Message from "../Components/Message";

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
      <Helmet>
        <title>Product Page</title>
      </Helmet>
      <Row>
        <Col md={6}>
          <img className="large" src={product.image} alt={product.name}></img>
        </Col>
      </Row>
    </div>
  );
};
export default Product;
