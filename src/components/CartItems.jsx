import { Button, ListGroup } from "react-bootstrap";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function CartItems({
  buttonTitle = "",
  onButtonClick = () => {},
  isSubmitting = false,
}) {
  const [cartItems, setCartItems] = useState([]);
  const subtotal = cartItems.reduce((a, b) => a + b.total_price, 0);
  const delivery = 5;
  const total = subtotal + delivery;

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
      setCartItems(result);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${api}/cart/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchCartData();
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch(`${api}/cart/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ quantity: newQuantity }),
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <ListGroup>
        {cartItems.map((item) => (
          <ListGroup.Item
            key={item.id}
            className="d-flex justify-content-between align-items-center"
          >
            <img
              src={cartImage(item.color, item.available_colors, item.images)}
              style={{ height: 150, marginBottom: 14 }}
            />

            <div className="left">
              <h6>{item.name}</h6>
              <br />
              <small>{item.color}</small> <br />
              <small>{item.size}</small>
              <div className="quantity">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="right">
              <h6>${item.price}</h6>
              <div style={{ marginTop: 1 }}></div>
              <Button
                variant="link"
                className="text-danger"
                onClick={() => deleteProduct(item.id)}
              >
                Remove
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="summary">
        <div className="summary-row">
          <span>Items subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span>${delivery}</span>
        </div>
        <div className="summary-row">
          <h5>Total</h5>
          <h5>${total}</h5>
        </div>
        <Button
          type="submit"
          className="w-100 mt-5 p-3"
          style={{ backgroundColor: "#FF4000", border: "none" }}
          onClick={onButtonClick}
          disabled={isSubmitting}
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
}
