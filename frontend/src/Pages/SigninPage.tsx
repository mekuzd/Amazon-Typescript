import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Provider/Store";
import apiClient from "../Services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../Types/apiError";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Loading from "../Components/Loading";
import DefaultLayout from "../Components/DefaultLayout";
const SignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { loading, userInfo } = state;

  const SignInUserInfo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOADING" });
      const result = await apiClient.post("/api/users/signin", {
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: result.data });
      localStorage.setItem("userInfo", JSON.stringify(result.data));
      navigate(redirect);
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });
      toast.error(getError(error as ApiError));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <DefaultLayout>
      <ToastContainer position="bottom-center" limit={1} />

      <Container className="small-container">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={SignInUserInfo}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button disabled={loading} type="submit">
              Sign In
            </Button>
            {loading && <Loading />}
          </div>
          <div className="mb-3">
            New customer?{" "}
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          </div>
        </Form>
      </Container>
    </DefaultLayout>
  );
};
export default SignIn;
