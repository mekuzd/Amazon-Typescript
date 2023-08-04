import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import { sampleProducts } from "./data";

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
          <Row>
            {sampleProducts.map((products) => (
              <Col key={products.slug} sm={6} md={4} lg={3}>
                <img src={products.image} alt="" className="product-image" />
                <h2>{products.name}</h2>
                <p>${products.price}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <footer>
        <div className="text-center">All right reserved</div>
      </footer>
    </div>
  );
}

export default App;
