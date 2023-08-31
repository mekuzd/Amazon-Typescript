import { useContext, useEffect, useState } from "react";
import { Store } from "../Provider/Store";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiClient from "../Services/apiClient";
import { ApiError } from "../Types/apiError";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../utils";
import DefaultLayout from "../Components/DefaultLayout";
import Loading from "../Components/Loading";
import Message from "../Components/Message";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { CartItem } from "../Types/Cart";
import { Order } from "../Types/Order";
import {
  PayPalButtons,
  usePayPalScriptReducer,
  SCRIPT_LOADING_STATE,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";

const OrderReview = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { userInfo, loading } = state;
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [paymentId, setPaymentId] = useState<string>("");
  let isMounted = true;

  useEffect(() => {
    const getOrder = async () => {
      try {
        dispatch({ type: "LOADING" });
        const result = await apiClient.get(`/api/orders/${id}`);
        setOrder(result.data);
        dispatch({ type: "STOP_LOADING" });
      } catch (err) {
        dispatch({ type: "STOP_LOADING" });
        setOrder(null);
        toast.error(getError(err as ApiError));
      }
    };

    if (isMounted) {
      getOrder();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // receive paypalPaymentID
  useEffect(() => {
    const getPaymentId = async () => {
      try {
        const result = await apiClient.get(`/api/keys/paypal`);
        setPaymentId(result.data.clientId);
      } catch (err) {
        toast.error(getError(err as ApiError));
      }
    };

    if (isMounted) {
      getPaymentId();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const payOrder = async (id: string, details: any) => {
    // update db with payment info
    try {
      let result = await apiClient.put(`/api/orders/${id}/pay`, { ...details }); // details here is the payment info from Paypal
      setOrder(result.data.order);
      toast.success(result.data.Message);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  // for dev purpose testing
  const testPayHandler = async () => {
    await payOrder(id!, {});
    toast.success("Order is paid");
  };

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    // set paymentId to paypal script
    // if PaymentId is true
    if (paymentId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paymentId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      loadPayPalScript();
    }
  }, []);

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: order!.totalPrice!.toString(), // total price sent to pAyPal
              },
            },
          ],
        })
        .then((orderID: string) => {
          return orderID;
        });
    },
    onApprove(data, actions) {
      return actions.order!.capture().then(async (details) => {
        try {
          payOrder(id!, { ...details });
          toast.success("Order is paid");
        } catch (err) {
          toast.error(getError(err as ApiError));
        }
      });
    },
    onError: (err) => {
      toast.error(getError(err as ApiError));
    },
  };
  console.log(order?.isPaid);

  useEffect(() => {
    if (!userInfo) {
      navigate("signin");
    }
  }, [userInfo]);

  return (
    <DefaultLayout>
      <ToastContainer position="bottom-center" limit={1} />
      {loading ? (
        <Loading />
      ) : !order ? (
        <Message variant="danger"> Order not found</Message>
      ) : (
        <div className="p-3">
          <Helmet>
            <title> Order {id} </title>
          </Helmet>
          <h1 className="my-3"> Order {id}</h1>
          <Row>
            <Col md={8}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Shipping</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {order?.shippingAddress?.fullName}{" "}
                    <br />
                    <strong>Address: </strong> {order?.shippingAddress?.address}
                    ,{order?.shippingAddress?.city},{" "}
                    {order?.shippingAddress?.postalCode},
                    {order?.shippingAddress?.country}
                  </Card.Text>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered at {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="warning">Not Delivered</Message>
                  )}
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Payment</Card.Title>
                  <Card.Text>
                    <strong>Method:</strong> {order.paymentMethod}
                  </Card.Text>
                  {order.isPaid ? (
                    <Message variant="success">Paid at {order.paidAt}</Message>
                  ) : (
                    <Message variant="warning">Not Paid</Message>
                  )}
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Items</Card.Title>
                  <ListGroup variant="flush">
                    {order.orderItems!.map((item: CartItem) => (
                      <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                          <Col md={6}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded thumbnail"
                            ></img>{" "}
                            <Link to={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={3}>
                            <span>{item.quantity}</span>
                          </Col>
                          <Col md={3}>${item.price}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Order Summary</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col> ${order.itemsPrice?.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col> ${order.shippingPrice?.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col> ${order.taxPrice?.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <strong> Order Total</strong>
                        </Col>
                        <Col>
                          <strong>${order.totalPrice!.toFixed(2)}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {!order?.isPaid && (
                      <ListGroup.Item>
                        {isPending ? (
                          <Loading />
                        ) : isRejected ? (
                          <Message> Error in connecting too Paypal</Message>
                        ) : (
                          <div>
                            <PayPalButtons
                              {...paypalbuttonTransactionProps}
                            ></PayPalButtons>
                            <Button onClick={testPayHandler}> Test Pay</Button>
                          </div>
                        )}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </DefaultLayout>
  );
};
export default OrderReview;
