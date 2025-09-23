import { useState } from "react";
import CartItems from "../../components/CartItems";
import OrderForm from "./OrderForm";
import Success from "./Success";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Formik, Form } from "formik";

export default function Order() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const userData = Cookies.get("user");
  const user = userData && JSON.parse(userData);
  const initialValues = {
    name: "",
    surname: "",
    email: user && user.email,
    address: "",
    zip_code: "",
  };

  const api = import.meta.env.VITE_API_URL;
  const token = Cookies.get("token");

  const closeToast = () => {
    navigate("/");
  };

  const onSubmit = async (values) => {
    const payload = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      address: values.address,
      zip_code: values.zip_code,
    };

    try {
      const response = await fetch(`${api}/cart/checkout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      data.message && setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Success show={show} closeToast={closeToast} />
      <h1
        style={{
          fontSize: 44,
          // margin: "72px 0 42px 100px",
          fontStyle: "SemiBold",
        }}
      >
        Checkout
      </h1>
      <div className="d-flex justify-content-center align-items-start mt-4">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              marginTop: 10,
            }}
          >
            <OrderForm />
            <div
              style={{
                width: 460,
                height: 635,
                margin: "0 0 124px 131px",
              }}
            >
              <CartItems buttonTitle="Pay" onButtonClick={onSubmit} />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
