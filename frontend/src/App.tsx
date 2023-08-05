import { Navbar, Container, Nav } from "react-bootstrap";
import Homepage from "./Pages/Hompage";

function App() {
  return (
    <div className="d-flex flex-column vh-100 ">
      {" "}
      <header>
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
      </header>
      <main>
        <Container className="mt-3">
          <Homepage />
        </Container>
      </main>
      <footer>
        <div className="text-center">All right reserved</div>
      </footer>
    </div>
  );
}

export default App;
