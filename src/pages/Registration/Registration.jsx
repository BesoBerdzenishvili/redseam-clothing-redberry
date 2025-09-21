import { Image } from "react-bootstrap";
import RegistrationForm from "./RegistrationForm";

export default function RegistrationPage() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div style={{}}>
        <Image
          src="./images/clothing.png"
          alt="Clothing"
          fluid
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: "25%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <RegistrationForm />
      </div>
    </div>
  );
}
