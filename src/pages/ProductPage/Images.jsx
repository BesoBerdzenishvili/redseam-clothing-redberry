import { Container, Card, Button, Form, Stack } from "react-bootstrap";

export default function Images({ data, selector, setSelector }) {
  return (
    <>
      <Stack style={{ border: "2px solid red" }}>
        {data.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product ${index + 1}`}
            style={{
              width: "20%",
              marginBottom: "10px",
              cursor: "pointer",
              border: "1px solid green",
            }}
            onMouseOver={() => setSelector(index)}
          />
        ))}
      </Stack>
      <Card.Img
        variant="top"
        src={data.images[selector]}
        style={{
          width: "50%",
          // margin: "0 auto",
          border: "1px solid magenta",
        }}
      />
    </>
  );
}
