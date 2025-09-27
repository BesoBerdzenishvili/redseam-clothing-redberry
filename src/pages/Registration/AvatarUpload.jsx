import { useState } from "react";
import { Button } from "react-bootstrap";
import "./AvatarUpload.css";

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
    const input = document.getElementById("avatarUpload");
    if (input) {
      input.value = "";
    }
  };

  return (
    <div className="avatar-container">
      <div className="avatar-wrapper">
        <img
          src={avatarPreview ? avatarPreview : "./images/avatar.png"}
          alt="Avatar"
          className="avatar-image"
          onClick={() => document.getElementById("avatarUpload").click()}
        />
      </div>
      <div>
        <input
          type="file"
          id="avatarUpload"
          accept="image/*"
          onChange={handleImageUpload}
          className="avatar-input"
        />
        <Button
          variant="link"
          onClick={() => document.getElementById("avatarUpload").click()}
          className="avatar-btn-upload"
        >
          Upload new
        </Button>
        {avatarPreview && (
          <Button
            variant="link"
            onClick={handleImageDelete}
            className="avatar-btn-remove"
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
