import "./CartSidebar.css";
import { Offcanvas } from "react-bootstrap";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartSidebar.css";

export default function CartSidebar({ handleClose }) {
  const [itemsAmount, setItemsAmount] = useState(1);
  const navigate = useNavigate();

  const moveToOrder = () => {
    navigate("/order");
  };

  return (
    <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping cart ({itemsAmount})</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {itemsAmount < 1 ? (
          <EmptyCart closeSidebar={handleClose} />
        ) : (
          <div className="cart-container">
            <CartItems
              buttonTitle="Go to checkout"
              setItemsAmount={setItemsAmount}
              onButtonClick={moveToOrder}
            />
          </div>
        )}
      </Offcanvas.Body>
    </>
  );
}
