import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Store } from "../Provider/Store";
import { Link } from "react-router-dom";
export type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  return (
    <>
      <Navbar bg={mode} variant={mode} expand="lg">
        <Container>
          <Navbar.Brand>AmazonTs</Navbar.Brand>
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
          <a className="nav-link" href="">
            Login
          </a>
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
