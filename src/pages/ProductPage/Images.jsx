import { Card, Stack } from "react-bootstrap";

export default function Images({ data, selector, setSelector }) {
  return (
    <>
      <Stack style={{ width: 121 }}>
        {data.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product ${index + 1}`}
            style={{
              width: "100%",
              marginBottom: "10px",
              cursor: "pointer",
              border: "1px solid grey",
            }}
            onMouseOver={() => setSelector(index)}
          />
        ))}
      </Stack>
      <Card.Img
        variant="top"
        src={data.images[selector]}
        style={{
          width: 703,
          margin: "0 168px 0 24px",
          borderRadius: 8,
        }}
      />
    </>
  );
}
