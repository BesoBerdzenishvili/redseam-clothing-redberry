import { Button } from "react-bootstrap";

export default function CartSummary({
  buttonTitle,
  isSubmitting,
  onButtonClick,
  cartItems,
}) {
  const subtotal = cartItems.reduce((a, b) => a + b.total_price, 0);
  const delivery = 5;
  const total = subtotal + delivery;
  return (
    <div className="summary">
      <div className="summary-row">
        <span>Items subtotal</span>
        <span>${subtotal}</span>
      </div>
      <div className="summary-row" style={{ marginTop: 15 }}>
        <span>Delivery</span>
        <span>${delivery}</span>
      </div>
      <div className="summary-row" style={{ marginTop: 20 }}>
        <h5>Total</h5>
        <h5>${total}</h5>
      </div>
      <Button
        type="submit"
        className=""
        style={{
          backgroundColor: "#FF4000",
          border: "none",
          borderRadius: 10,
          padding: "18px 0",
          marginTop: 85,
          width: "100%",
        }}
        onClick={onButtonClick}
        disabled={isSubmitting}
      >
        {buttonTitle}
      </Button>
    </div>
  );
}
