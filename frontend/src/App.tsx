import { Container } from "react-bootstrap";
import Homepage from "./Pages/Hompage";
import DefaultLayout from "./Components/DefaultLayout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="d-flex flex-column vh-100 ">
      <ToastContainer position="bottom-center" limit={1} />
      <DefaultLayout>
        <main>
          <Container className="mt-3 ">
            <Homepage />
          </Container>
        </main>
      </DefaultLayout>
    </div>
  );
}

export default App;
