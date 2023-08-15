import { Container } from "react-bootstrap";
import Homepage from "./Pages/Hompage";
import DefaultLayout from "./Components/DefaultLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="d-flex flex-column vh-100 ">
      {" "}
      <DefaultLayout>
        <ToastContainer position="bottom-center" limit={1} />
        <main>
          <Container className="mt-3">
            <Homepage />
          </Container>
        </main>
      </DefaultLayout>
    </div>
  );
}

export default App;
