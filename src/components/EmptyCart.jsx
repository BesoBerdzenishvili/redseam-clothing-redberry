import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ({ closeSidebar }) {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/");
    closeSidebar();
  };
  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img
        style={{ marginTop: 175 }}
        src="./images/empty_cart.png"
        alt="Empty cart"
      />
      <h4 style={{ marginTop: 40 }}>Ooops!</h4>
      <p style={{ marginBottom: 60, fontSize: 14 }}>
        You've got nothing in your cart just yet...
      </p>
      <Button
        style={{
          backgroundColor: "#FF4000",
          border: "none",
          borderRadius: 12,
          padding: "10px 55px",
          fontSize: 14,
        }}
        onClick={goToMain}
      >
        Start shopping
      </Button>
    </div>
  );
}
