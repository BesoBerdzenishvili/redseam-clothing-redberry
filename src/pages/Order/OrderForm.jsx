import { Form, Row } from "react-bootstrap";

export default function OrderForm() {
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
            <Form.Control type="text" placeholder="Name" />
          </Form.Group>
          <Form.Group controlId="formSurname" className="mb-3">
            <Form.Control type="text" placeholder="Surname" />
          </Form.Group>
        </div>
        <Form.Group controlId="formEmail" className="mb-5">
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Control type="text" placeholder="Address" />
          </Form.Group>
          <Form.Group controlId="formZipCode" className="mb-3">
            <Form.Control type="text" placeholder="Zip code" />
          </Form.Group>
        </div>
      </div>
    </Form>
  );
}
