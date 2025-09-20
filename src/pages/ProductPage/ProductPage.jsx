import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Images from "./Images";
import Description from "./Description";

const ProductPage = () => {
  const [selector, setSelector] = useState(0);
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState();

  const api = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(`${api}/products/24`);
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
      {data && (
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
