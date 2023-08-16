import { Container } from "react-bootstrap";
import Homepage from "./Pages/Hompage";
import DefaultLayout from "./Components/DefaultLayout";
function App() {
  return (
    <div className="d-flex flex-column vh-100 ">
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
