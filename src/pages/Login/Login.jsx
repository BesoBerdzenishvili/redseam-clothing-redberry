import { Image } from "react-bootstrap";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
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
          right: "26%",
          top: "46%",
          transform: "translateY(-50%)",
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
}
