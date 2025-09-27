import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import "./OrderForm.css";

export default function OrderForm() {
  return (
    <Form className="order-container">
      <div style={{ width: "53%" }}>
        <h2 className="order-form-subtitle">Order details</h2>
        <div className="order-row">
          <Form.Group controlId="formName">
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red", fontSize: "12px" }}
            />
            <Field
              className="order-field even-fields"
              size="lg"
              name="name"
              type="text"
              placeholder="name"
            />
          </Form.Group>
          <Form.Group controlId="formSurname">
            <ErrorMessage
              name="surname"
              component="div"
              style={{ color: "red", fontSize: "12px" }}
            />
            <Field
              className="order-field even-fields"
              size="lg"
              name="surname"
              type="text"
              placeholder="Surname"
            />
          </Form.Group>
        </div>
        <Form.Group controlId="formEmail">
          <ErrorMessage
            name="email"
            component="div"
            style={{ color: "red", fontSize: "12px" }}
          />
          <Field
            className="order-field order-email"
            size="lg"
            name="email"
            type="text"
            placeholder="email"
          />
        </Form.Group>
        <div className="order-row">
          <Form.Group controlId="formAddress">
            <ErrorMessage
              name="address"
              component="div"
              style={{ color: "red", fontSize: "12px" }}
            />
            <Field
              className="order-field even-fields"
              size="lg"
              name="address"
              type="text"
              placeholder="Address"
            />
          </Form.Group>
          <Form.Group controlId="formZipCode">
            <ErrorMessage
              name="zip_code"
              component="div"
              style={{ color: "red", fontSize: "12px" }}
            />
            <Field
              className="order-field even-fields"
              size="lg"
              name="zip_code"
              type="text"
              placeholder="Zip code"
            />
          </Form.Group>
        </div>
      </div>
    </Form>
  );
}
