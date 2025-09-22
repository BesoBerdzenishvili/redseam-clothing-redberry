import "./CartSidebar.css";
import { Offcanvas } from "react-bootstrap";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CartSidebar() {
  const [data, setData] = useState([]);
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
      setData(result);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping cart ({data.length})</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {data.length < 1 ? (
          <EmptyCart />
        ) : (
          <CartItems buttonTitle="Go to checkout" />
        )}
      </Offcanvas.Body>
    </>
  );
}
