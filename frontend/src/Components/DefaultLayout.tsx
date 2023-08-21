import {
  Navbar,
  Container,
  Nav,
  Button,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Store } from "../Provider/Store";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  return (
    <>
      <Navbar bg={mode} variant={mode} expand="lg">
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>AmazonTs</Navbar.Brand>
          </LinkContainer>
        </Container>
        <Button onClick={switchModeHandler} variant={mode}>
          {mode == "dark" ? "light" : "dark"}
        </Button>
        <Nav>
          <Link className="nav-link" to={"/cart"}>
            Cart
            {cart.cartItems.length > 0 && (
              //sum up quantity in cart
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
          {userInfo ? (
            <NavDropdown title={userInfo.name}>
              <Link
                className="dropdown-item"
                to={"#signout"}
                onClick={signoutHandler}
              >
                Sign Out
              </Link>
            </NavDropdown>
          ) : (
            <Link className="nav-link" to={"/signin"}>
              signIn
            </Link>
          )}
        </Nav>
      </Navbar>
      {children}
      <footer>
        <div className="text-center">All right reserved</div>
      </footer>
    </>
  );
};
export default DefaultLayout;
