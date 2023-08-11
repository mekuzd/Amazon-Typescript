import { Row, Col } from "react-bootstrap";

import { useReducer, useEffect } from "react";
import { getError, reducer } from "../utils";
import { ApiError } from "../Types/apiError";
import Loading from "../Components/Loading";
import Message from "../Components/Message";
import ProductItem from "../Components/ProductItem";
import { Helmet } from "react-helmet-async";
import apiClient from "../Services/apiClient";
import { State } from "../Types/state";
import { Action } from "../Types/Action";

export const initialState: State = {
  products: [],
  loading: true,
  error: "",
  product: "",
};

const Homepage = () => {
  const [{ products, loading, error }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await apiClient.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error as ApiError),
        });
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Row>
      <Helmet>
        <title>Amazona Ts</title>
      </Helmet>
      {products.map((products) => (
        <Col key={products.slug} sm={6} md={4} lg={3}>
          <ProductItem products={products} />
        </Col>
      ))}
    </Row>
  );
};
export default Homepage;
