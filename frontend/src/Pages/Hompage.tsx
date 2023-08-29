import { Row, Col } from "react-bootstrap";
import { useReducer, useEffect } from "react";
import { getError } from "../utils";
import { reducer } from "../Reducer";
import { ApiError } from "../Types/apiError";
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
  product: {},
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

  // skeleton for products
  const skeletonItems = Array.from(
    { length: products.length || 4 },
    (_, index) => (
      <Col sm={6} md={4} lg={3}>
        <div key={index} className="pre-load bg-light">
          <div
            className="loadings animate  w-100"
            style={{ height: "280px" }}
          ></div>

          <div className=" my-3 p-3">
            <p
              className="loadings animate"
              style={{ height: "20px", width: "70%" }}
            ></p>
            <p
              className="loadings animate my-3"
              style={{ height: "20px", width: "50%" }}
            ></p>
            <p
              className="loadings animate"
              style={{ height: "20px", width: "50%" }}
            ></p>
            <p
              className="loadings animate mt-2 rounded"
              style={{ height: "40px", width: "100px" }}
            ></p>
          </div>
        </div>
      </Col>
    ),
  );

  return loading ? (
    <Row>{skeletonItems}</Row>
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
