import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Header from "./components/Header";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Products />} />
        <Route path="product" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
