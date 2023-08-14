import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Store } from "../Provider/Store";
export type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  const {
    state: { mode },
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
          <a className="nav-link" href="">
            Cart
          </a>
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
