import "./CartSidebar.css";
import { Offcanvas } from "react-bootstrap";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";

export default function CartSidebar() {
  const cartItems = [];

  return (
    <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping cart ({cartItems.length})</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length < 1 ? (
          <EmptyCart />
        ) : (
          <CartItems cartItems={cartItems} buttonTitle="Go to checkout" />
        )}
      </Offcanvas.Body>
    </>
  );
}
