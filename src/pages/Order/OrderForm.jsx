import { Form } from "react-bootstrap";
import { Field } from "formik";

export default function OrderForm() {
  return (
    <Form className="order-container">
      <div style={{ width: "53%" }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 500,
            marginBottom: 45,
            marginTop: 70,
          }}
        >
          Order details
        </h2>
        <div className="order-row">
          <Form.Group controlId="formName">
            <Field
              className="order-field even-fields"
              size="lg"
              name="name"
              type="text"
              placeholder="name"
            />
          </Form.Group>
          <Form.Group controlId="formSurname">
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
            <Field
              className="order-field even-fields"
              size="lg"
              name="address"
              type="text"
              placeholder="Address"
            />
          </Form.Group>
          <Form.Group controlId="formZipCode">
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
