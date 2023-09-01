import { useEffect, useState, useContext } from "react";
import apiClient from "../Services/apiClient";
import { Order } from "../Types/Order";
import { useNavigate } from "react-router-dom";
import { Store } from "../Provider/Store";
import { ApiError } from "../Types/apiError";
import { getError } from "../utils";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Loading from "../Components/Loading";
import Message from "../Components/Message";
import { Button } from "react-bootstrap";
import DefaultLayout from "../Components/DefaultLayout";

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { userInfo, loading } = state;
  let isMounted = true;

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        dispatch({ type: "LOADING" });
        const result = await apiClient.get("/api/orders/mine");
        setOrders(result.data);
        dispatch({ type: "STOP_LOADING" });
      } catch (err) {
        dispatch({ type: "STOP_LOADING" });
        setOrders([]);
        toast.error(getError(err as ApiError));
      }
    };

    if (isMounted) {
      fetchUserOrders();
    }
  }, []);

  console.log(orders);

  useEffect(() => {
    if (!userInfo) {
      navigate("signin");
    }
  }, [userInfo]);
  return (
    <DefaultLayout>
      <div className="p-4">
        <ToastContainer position="bottom-center" limit={1} />
        <Helmet>
          <title>Order History</title>
        </Helmet>

        <h1>Order History</h1>
        {loading ? (
          <Loading />
        ) : orders.length < 1 ? (
          <Message variant="danger">Orders not found </Message>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders!.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt!.substring(0, 10)}</td>
                  <td>{order.totalPrice!.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? order.paidAt!.substring(0, 10) : "No"}
                  </td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt!.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DefaultLayout>
  );
};
export default OrderHistory;
