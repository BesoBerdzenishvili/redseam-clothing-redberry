import CartItems from "../../components/CartItems";
import OrderForm from "./OrderForm";

export default function Order() {
  const cartItems = [];
  return (
    <div className="d-flex justify-content-center align-items-start mt-4">
      <OrderForm />
      <div
        style={{
          width: 460,
          height: 635,
          marginLeft: 131,
        }}
      >
        <CartItems cartItems={cartItems} buttonTitle="Pay" />
      </div>
    </div>
  );
}
