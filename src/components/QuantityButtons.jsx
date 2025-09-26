import { Button } from "react-bootstrap";
export default function QuantityButtons({ updateQuantity, item }) {
  return (
    <div
      className="quantity"
      style={{
        border: "1.5px solid lightgray",
        borderRadius: 50,
        height: 25,
        padding: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        variant="outline-secondary"
        size="sm"
        style={{
          height: "100%",
          border: "none",
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
          lineHeight: "25px",
          padding: "0 8px",
        }}
        onClick={() =>
          updateQuantity(item.id, item.quantity - 1, item.color, item.size)
        }
      >
        -
      </Button>
      <span className="mx-2" style={{ lineHeight: "25px" }}>
        {item.quantity}
      </span>
      <Button
        variant="outline-secondary"
        size="sm"
        style={{
          height: "100%",
          border: "none",
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          lineHeight: "25px",
          padding: "0 8px",
        }}
        onClick={() =>
          updateQuantity(item.id, item.quantity + 1, item.color, item.size)
        }
      >
        +
      </Button>
    </div>
  );
}
