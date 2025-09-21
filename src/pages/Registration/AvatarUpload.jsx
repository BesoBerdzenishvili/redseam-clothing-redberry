import { useState } from "react";
import { Button, Image } from "react-bootstrap";

export default function AvatarUpload({ setFieldValue }) {
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFieldValue("avatar", file);
    }
  };

  const handleImageDelete = () => {
    setAvatarPreview(null);
    setFieldValue("avatar", null);
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: "50px 0 50px 0",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#F7FAFC",
          marginRight: 20,
          overflow: "hidden",
        }}
      >
        {avatarPreview ? (
          <Image
            src={avatarPreview}
            alt="Avatar"
            fluid
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Image
            src="./images/avatar.png"
            alt="Generic Avatar"
            fluid
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>
      <div>
        <input
          type="file"
          id="avatarUpload"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <Button
          variant="link"
          onClick={() => document.getElementById("avatarUpload").click()}
          style={{
            color: "black",
            textDecoration: "none",
            padding: "0",
            marginRight: "10px",
            fontSize: 14,
          }}
        >
          Upload new
        </Button>
        {avatarPreview && (
          <Button
            variant="link"
            onClick={handleImageDelete}
            style={{
              color: "black",
              textDecoration: "none",
              padding: "0",
              fontSize: 14,
            }}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
