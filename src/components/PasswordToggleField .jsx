import React, { useState } from "react";
import "./PasswordToggleField.css";

const PasswordToggleField = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const modifiedChild = React.cloneElement(children, {
    type: showPassword ? "text" : "password",
    style: {
      // TODO: remove that when external css will be added
      ...children.props.style,
    },
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
};

export default PasswordToggleField;
