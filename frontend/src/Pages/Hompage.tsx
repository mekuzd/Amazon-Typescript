import { Row, Col } from "react-bootstrap";
import { Product } from "../Types/Product";
import { useReducer, useEffect } from "react";
import { getError } from "../utils";
import { ApiError } from "../Types/apiError";
import axios from "axios";
import Loading from "../Components/Loading";
import Message from "../Components/Message";
import ProductItem from "../Components/ProductItem";
import { Helmet } from "react-helmet-async";
type State = {
  products: Product[];
  loading: boolean;
  error: string;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Product[] }
  | { type: "FETCH_FAIL"; payload: string };

const initialState: State = {
  products: [],
  loading: true,
  error: "",
};

const reducer = (state: State, action: Action) => {
  if (action.type == "FETCH_REQUEST") {
    return { ...state, loading: true };
  } else if (action.type == "FETCH_SUCCESS") {
    return { ...state, products: action.payload, loading: false };
  } else if (action.type == "FETCH_FAIL") {
    return { ...state, error: action.payload, loading: false };
  } else {
    return state;
  }
};

const Homepage = () => {
  const [{ products, loading, error }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
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
