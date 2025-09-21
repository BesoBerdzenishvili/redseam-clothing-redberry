import { Toast, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Success({ show, closeToast }) {
  return (
    <Toast
      show={show}
      onClose={closeToast}
      style={{
        background: "white",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 876,
        height: 590,
        zIndex: 11,
      }}
    >
      <Toast.Header></Toast.Header>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            src="./images/congrats.png"
            alt="success"
            style={{ width: 70, height: 70, objectFit: "cover" }}
          />
          <h1 style={{ fontSize: 44, margin: "44px 0 20px 0" }}>Congrats!</h1>
          <p>Your order is placed successfully!</p>
        </div>
        <Link to={"/"}>
          <Button
            style={{
              marginTop: 60,
              fontSize: 14,
              padding: "10px 40px 10px 40px",
              borderRadius: 10,
            }}
            variant="danger"
          >
            Continue shopping
          </Button>
        </Link>
      </div>
    </Toast>
  );
}
