import { useState } from "react";
import CartItems from "../../components/CartItems";
import OrderForm from "./OrderForm";
import Success from "./Success";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [show, toggleShow] = useState(false);
  const navigate = useNavigate();

  const closeToast = () => {
    navigate("/");
  };

  const cartItems = [];
  return (
    <div>
      <Success show={show} closeToast={closeToast} />
      <h1
        style={{
          fontSize: 44,
          margin: "72px 0 42px 100px",
          fontStyle: "SemiBold",
        }}
      >
        Checkout
      </h1>
      <div className="d-flex justify-content-center align-items-start mt-4">
        <OrderForm />
        <div
          style={{
            width: 460,
            height: 635,
            margin: "0 0 124px 131px",
          }}
        >
          <CartItems cartItems={cartItems} buttonTitle="Pay" />
        </div>
      </div>
    </div>
  );
}
