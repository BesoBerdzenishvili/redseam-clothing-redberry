import React, { useState } from "react";

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
    <div style={{ position: "relative", width: "100%" }}>
      <img
        src={`./images/${showPassword ? "eye_icon" : "closed_eye"}.png`}
        alt="Toggle Password Visibility"
        onClick={togglePasswordVisibility}
        style={{
          position: "absolute",
          right: 15,
          top: "50%",
          transform: "translateY(-50%)",
          width: "20px",
          height: "20px",
          cursor: "pointer",
          zIndex: 1,
        }}
      />
      {modifiedChild}
    </div>
  );
};

export default PasswordToggleField;
