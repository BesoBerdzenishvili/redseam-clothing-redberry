import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Header from "./components/Header";
import ProductPage from "./pages/ProductPage/ProductPage";
import Registration from "./pages/Registration/Registration";
import LoginPage from "./pages/Login/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Products />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
