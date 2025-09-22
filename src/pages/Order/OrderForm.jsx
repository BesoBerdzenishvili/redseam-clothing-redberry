import { Form } from "react-bootstrap";
import Cookies from "js-cookie";
import { Field } from "formik";

export default function OrderForm() {
  const userData = Cookies.get("user");
  const user = userData && JSON.parse(userData);
  return (
    <Form
      className="p-4 bg-light rounded"
      style={{ minWidth: "1129px", height: "635px" }}
    >
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Group controlId="formName" className="mb-5">
            <Field
              size="lg"
              name="name"
              // as={BootstrapForm.Control}
              type="text"
              placeholder="name"
              style={{
                borderRadius: "4px",
                border: "1px solid #E2E8F0",
                fontSize: 14,
              }}
            />
          </Form.Group>
          <Form.Group controlId="formSurname" className="mb-3">
            <Field
              size="lg"
              name="surname"
              // as={BootstrapForm.Control}
              type="text"
              placeholder="Surname"
              style={{
                borderRadius: "4px",
                border: "1px solid #E2E8F0",
                fontSize: 14,
              }}
            />
          </Form.Group>
        </div>
        <Form.Group controlId="formEmail" className="mb-5">
          <Field
            size="lg"
            name="email"
            // as={BootstrapForm.Control}
            type="text"
            placeholder="email"
            style={{
              borderRadius: "4px",
              border: "1px solid #E2E8F0",
              fontSize: 14,
            }}
          />
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Group controlId="formAddress" className="mb-3">
            <Field
              size="lg"
              name="address"
              // as={BootstrapForm.Control}
              type="text"
              placeholder="Address"
              style={{
                borderRadius: "4px",
                border: "1px solid #E2E8F0",
                fontSize: 14,
              }}
            />
          </Form.Group>
          <Form.Group controlId="formZipCode" className="mb-3">
            <Field
              size="lg"
              name="zip_code"
              // as={BootstrapForm.Control}
              type="text"
              placeholder="Zip code"
              style={{
                borderRadius: "4px",
                border: "1px solid #E2E8F0",
                fontSize: 14,
              }}
            />
          </Form.Group>
        </div>
      </div>
    </Form>
  );
}
