import "./App.css";
import { sampleProducts } from "./data";

function App() {
  return (
    <>
      <header>
        <h1>Amazon</h1>
      </header>
      <main>
        <ul>
          {sampleProducts.map((products) => (
            <li key={products.slug}>
              <img src={products.image} alt="" className="product-image" />
              <h2>{products.name}</h2>
              <p>${products.price}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
