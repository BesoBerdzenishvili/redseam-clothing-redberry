import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
