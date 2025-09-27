import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./EmptyCart.css";

export default function ({ closeSidebar }) {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/");
    closeSidebar();
  };
  return (
    <div className="empty-cart-container">
      <img
        className="empty-cart-image"
        src="./images/empty_cart.png"
        alt="Empty cart"
      />
      <h4 className="empty-cart-title">Ooops!</h4>
      <p className="empty-cart-message">
        You've got nothing in your cart just yet...
      </p>
      <Button className="empty-cart-button" onClick={goToMain}>
        Start shopping
      </Button>
    </div>
  );
}
