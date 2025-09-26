import { Button, ListGroup } from "react-bootstrap";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuantityButtons from "./QuantityButtons";

export default function CartItems({
  buttonTitle = "",
  onButtonClick = () => {},
  isSubmitting = false,
  setItemsAmount = () => {},
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
            className="d-flex justify-content-between align-items-center my-1 border-0"
          >
            <Link to={`/product/${item.id}`}>
              <img
                src={cartImage(item.color, item.available_colors, item.images)}
                style={{
                  height: 130,
                  borderRadius: 8,
                  border: "1.5px solid lightgrey",
                }}
              />
            </Link>

            <div
              className="left"
              style={{
                width: "100%",
                padding: 17,
              }}
            >
              <Link
                to={`/product/${item.id}`}
                // make paler on hover (lower opacity)
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>{item.name}</h6>
              </Link>

              <small style={{ marginBottom: 2 }}>{item.color}</small>
              <small style={{ marginBottom: 10 }}>{item.size}</small>

              <QuantityButtons updateQuantity={updateQuantity} item={item} />
            </div>

            <div
              className="right"
              style={{
                height: 141,
              }}
            >
              <h6>${item.price}</h6>
              <Button
                variant="link"
                onClick={() =>
                  deleteProduct(item.id, item.quantity, item.color, item.size)
                }
                // in css file make red on hover
                style={{
                  padding: 0,
                  textDecoration: "none",
                  color: "black",
                  fontSize: 12,
                }}
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
            padding: "18px 170px",
            marginTop: 85,
            width: "100%",
          }}
          onClick={onButtonClick}
          disabled={isSubmitting}
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
}
