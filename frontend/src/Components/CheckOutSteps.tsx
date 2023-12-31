import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CheckoutSteps(props: {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}) {
  return (
    <Row className="checkout-steps mt-4 p-3">
      <Col className={props.step1 ? "active" : ""}>Sign-In</Col>
      <Col className={props.step2 ? "active" : ""}>Shipping</Col>
      <Col className={props.step3 ? "active" : ""}>Payment</Col>
      <Col className={props.step4 ? "active" : ""}>Place Order</Col>
    </Row>
  );
}
export default CheckoutSteps;
