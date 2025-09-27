import LoginForm from "./LoginForm";
import "./Login.css";

export default function LoginPage() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <img
          src="./images/clothing.png"
          alt="Clothing"
          className="login-image"
        />
      </div>
      <div className="login-form-container">
        <LoginForm />
      </div>
    </div>
  );
}
