import { Card, Stack } from "react-bootstrap";
import "./Images.css";

export default function Images({ data, selector, setSelector }) {
  return (
    <>
      <Stack className="product-page-image-stack">
        {data.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product ${index + 1}`}
            className="product-page-image-thumb"
            onMouseOver={() => setSelector(index)}
          />
        ))}
      </Stack>
      <Card.Img
        variant="top"
        src={data.images[selector]}
        className="product-page-image-main"
      />
    </>
  );
}
