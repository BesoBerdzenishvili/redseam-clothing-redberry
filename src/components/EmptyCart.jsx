import React from "react";
import { Button } from "react-bootstrap";

export default function () {
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
      <Button color="danger">Start shopping</Button>
    </div>
  );
}
