import { useState } from "react";
import CartItems from "../../components/CartItems";
import OrderForm from "./OrderForm";
import Success from "./Success";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Formik, Form } from "formik";
import "./Order.css";

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

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
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

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({
            general: data.message || "An error occurred during login",
          });
        }
        return;
      }

      data.message && setShow(true);
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Success show={show} closeToast={closeToast} />
      <h1 className="order-title">Checkout</h1>
      <div className="d-flex justify-content-center align-items-start mt-4">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, errors }) => (
            <Form className="order-form">
              {errors.general && <div>{errors.general}</div>}
              <OrderForm />
              <div className="order-cart-items-container">
                <CartItems
                  buttonTitle="Pay"
                  onButtonClick={onSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
