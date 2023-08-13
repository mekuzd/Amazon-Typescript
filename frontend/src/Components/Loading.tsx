import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="center-screen">
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};
export default Loading;
