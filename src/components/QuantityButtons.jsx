import { Button } from "react-bootstrap";
import "./QuantityButtons.css";

export default function QuantityButtons({ updateQuantity, item }) {
  return (
    <div className="quantity-container">
      <Button
        variant="outline-secondary"
        size="sm"
        className="quantity-decrease"
        onClick={() =>
          updateQuantity(item.id, item.quantity - 1, item.color, item.size)
        }
      >
        -
      </Button>
      <span className="mx-2">{item.quantity}</span>
      <Button
        variant="outline-secondary"
        size="sm"
        className="quantity-increase"
        onClick={() =>
          updateQuantity(item.id, item.quantity + 1, item.color, item.size)
        }
      >
        +
      </Button>
    </div>
  );
}
