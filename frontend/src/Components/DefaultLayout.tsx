import { Navbar, Container, Nav } from "react-bootstrap";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>AmazonTs</Navbar.Brand>
        </Container>
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
