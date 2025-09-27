import React, { useState } from "react";
import "./PasswordToggleField.css";

export default function PasswordToggleField({ children }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const modifiedChild = React.cloneElement(children, {
    type: showPassword ? "text" : "password",
  });

  return (
    <div className="toggle-password-container">
      <img
        src={`./images/${showPassword ? "eye_icon" : "closed_eye"}.png`}
        alt="Eye"
        onClick={togglePasswordVisibility}
        className="toggle-password-image"
      />
      {modifiedChild}
    </div>
  );
}
