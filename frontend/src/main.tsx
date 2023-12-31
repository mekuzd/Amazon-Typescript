import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "antd/dist/reset.css";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./Pages/product.tsx";
import { StoreProvider } from "./Provider/Store.tsx";
import Cartpage from "./Pages/CartPage.tsx";
import SignIn from "./Pages/SigninPage.tsx";
import SignUp from "./Pages/SignUpPage.tsx";
import ShippingAddressPage from "./Pages/ShippingAddress.tsx";
import PaymentPage from "./Pages/Payementpage.tsx";
import PlaceOrder from "./Pages/PlaceOrderpage.tsx";
import OrderReview from "./Pages/orderReviewPage.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderHistory from "./Pages/OrderHistory.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Error404 />,
  },
  {
    path: "/product/:slug",
    element: <Product />,
  },
  {
    path: "/cart",
    element: <Cartpage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/shipping",
    element: <ShippingAddressPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/placeorder",
    element: <PlaceOrder />,
  },
  {
    path: "/order/:id",
    element: <OrderReview />,
  },
  {
    path: "/orders",
    element: <OrderHistory />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ clientId: "sb" }} deferLoading={true}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>,
);
