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
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./Pages/SigninPage.tsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
);
