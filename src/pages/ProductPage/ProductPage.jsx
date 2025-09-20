import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import Images from "./Images";
import Description from "./Description";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const [selector, setSelector] = useState(0);
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = import.meta.env.VITE_API_URL;

  let { id } = useParams();
  const fetchData = async () => {
    try {
      const response = await fetch(`${api}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      // console.log(result, "results");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3" />
          <p>Loading data...</p>
        </div>
      )}
      {error && (
        <div className="text-center">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && data && (
        <Container style={{ border: "1px solid black" }}>
          <div style={{ display: "flex" }}>
            <Images data={data} selector={selector} setSelector={setSelector} />
            <Description
              data={data}
              selector={selector}
              setSelector={setSelector}
              selectedSize={selectedSize}
              quantity={quantity}
              setSelectedSize={setSelectedSize}
              setQuantity={setQuantity}
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default ProductPage;
