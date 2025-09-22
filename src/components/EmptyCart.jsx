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
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h2>Ooops!</h2>
      <p style={{ marginBottom: 60 }}>
        You've got nothing in your cart just yet...
      </p>
      <Button color="danger" onClick={goToMain}>
        Start shopping
      </Button>
    </div>
  );
}
