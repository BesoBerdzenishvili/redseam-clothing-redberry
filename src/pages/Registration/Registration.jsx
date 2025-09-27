import RegistrationForm from "./RegistrationForm";
import "./Registration.css";

export default function RegistrationPage() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <img
          src="./images/clothing.png"
          alt="Clothing"
          className="registration-bg-image"
        />
      </div>
      <div className="registration-form-wrapper">
        <RegistrationForm />
      </div>
    </div>
  );
}
