import { Button, ListGroup } from "react-bootstrap";

export default function CartItems({ cartItems, buttonTitle = "" }) {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const delivery = 5;
  const total = subtotal + delivery;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <ListGroup>
        {cartItems.map((item) => (
          <ListGroup.Item
            key={item.id}
            className="d-flex justify-content-between align-items-center"
          >
            <img
              src={
                "https://api.redseam.redberryinternship.ge/storage/3d138564bac0445ee956701b039f50fb_images.jpg"
              }
              style={{ height: 150, marginBottom: 14 }}
            />

            <div className="left">
              <h6>{item.name}</h6>
              <br />
              <small>{item.color}</small> <br />
              <small>{item.size}</small>
              <div className="quantity">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => {}}
                >
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => {}}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="right">
              <h6>${item.price}</h6>
              <div style={{ marginTop: 1 }}></div>
              <Button variant="link" className="text-danger" onClick={() => {}}>
                Remove
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="summary">
        <div className="summary-row">
          <span>Items subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span>${delivery}</span>
        </div>
        <div className="summary-row">
          <h5>Total</h5>
          <h5>${total}</h5>
        </div>
        <Button variant="danger" className="w-100 mt-5 p-3" onClick={() => {}}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
}
