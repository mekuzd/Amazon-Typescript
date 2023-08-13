import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Context } from "../Provider/Context";
import { useContext } from "react";
export type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  const { mode, handleSwitch } = useContext(Context);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>AmazonTs</Navbar.Brand>
        </Container>
        <Button onClick={handleSwitch} variant={mode}>
          {mode}
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
