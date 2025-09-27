import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Images from "./Images";
import Description from "./Description";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./ProductPage.css";
import Spinner from "../../components/Spinner";

const ProductPage = () => {
  const [selector, setSelector] = useState(0);
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  let { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`${api}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const addToCart = async () => {
    const token = Cookies.get("token");
    const selectedColor = data.available_colors[selector];

    try {
      const response = await fetch(`${api}/cart/products/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          quantity: quantity,
          color: selectedColor,
          size: selectedSize,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("You have successfully added item to the cart!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      {error && (
        <div className="text-center">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && data && (
        <Container fluid className="product-page-container">
          <p className="product-page-breadcrumb">Listing / Product</p>
          <div className="product-page-content">
            <Images data={data} selector={selector} setSelector={setSelector} />
            <Description
              data={data}
              selector={selector}
              setSelector={setSelector}
              selectedSize={selectedSize}
              quantity={quantity}
              setSelectedSize={setSelectedSize}
              setQuantity={setQuantity}
              addToCart={addToCart}
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default ProductPage;
