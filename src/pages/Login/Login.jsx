import { Image } from "react-bootstrap";

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
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>
    </div>
  );
}
