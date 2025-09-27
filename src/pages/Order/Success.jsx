import { Toast, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Success.css";

export default function Success({ show, closeToast }) {
  return (
    <Toast show={show} onClose={closeToast} className="toast-container">
      <Toast.Header className="toast-header" />
      <div className="toast-body">
        <div className="toast-content">
          <Image
            src="./images/congrats.png"
            alt="success"
            className="toast-image"
          />
          <h1 className="toast-title">Congrats!</h1>
          <p>Your order is placed successfully!</p>
        </div>
        <Link to={"/"}>
          <Button className="toast-button">Continue shopping</Button>
        </Link>
      </div>
    </Toast>
  );
}
