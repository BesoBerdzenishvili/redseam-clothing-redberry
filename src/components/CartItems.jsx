import { Button, ListGroup } from "react-bootstrap";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuantityButtons from "./QuantityButtons";
import CartSummary from "./CartSummary";
import "./CartItems.css";

export default function CartItems({
  buttonTitle = "",
  onButtonClick = () => {},
  isSubmitting = false,
  setItemsAmount = () => {},
}) {
  const [cartItems, setCartItems] = useState([]);

  const api = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");

  const fetchCartData = async () => {
    try {
      const response = await fetch(`${api}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setItemsAmount(result.length);
      setCartItems(result);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const deleteProduct = async (productId, quantity, color, size) => {
    try {
      const response = await fetch(`${api}/cart/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ quantity, color, size }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchCartData();
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateQuantity = async (productId, newQuantity, color, size) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch(`${api}/cart/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ quantity: newQuantity, color, size }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchCartData();
    } catch (err) {
      console.error(err.message);
    }
  };

  const cartImage = (color, colors, images) => {
    const imgIndex = colors.indexOf(color);
    return images[imgIndex] || "";
  };

  return (
    <div className="cart-items-container">
      <ListGroup>
        {cartItems.map((item) => (
          <ListGroup.Item
            key={item.id}
            className="d-flex justify-content-between align-items-center mt-1 border-0"
          >
            <Link to={`/product/${item.id}`}>
              <img
                src={cartImage(item.color, item.available_colors, item.images)}
                className="cart-items-image"
                alt={item.name}
              />
            </Link>

            <div className="cart-items-left">
              <Link to={`/product/${item.id}`} className="cart-items-link">
                <h6>{item.name}</h6>
              </Link>

              <small className="cart-items-small">{item.color}</small>
              <small className="cart-items-small-last">{item.size}</small>

              <QuantityButtons updateQuantity={updateQuantity} item={item} />
            </div>

            <div className="cart-items-right">
              <h6>${item.price}</h6>
              <Button
                variant="link"
                onClick={() =>
                  deleteProduct(item.id, item.quantity, item.color, item.size)
                }
                className="cart-items-remove-button"
              >
                Remove
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <CartSummary
        buttonTitle={buttonTitle}
        isSubmitting={isSubmitting}
        onButtonClick={onButtonClick}
        cartItems={cartItems}
      />
    </div>
  );
}
