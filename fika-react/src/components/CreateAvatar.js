import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAvatar.css";

const CreateAvatar = () => {
  const [avatar, setAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setAvatar(uploadedFile);
      setAvatarURL(URL.createObjectURL(uploadedFile)); // Create a URL for the uploaded file
      setIsFileUploaded(true);
    }
  };

  const handleRedirect = (url) => {
    if (avatar) {
      localStorage.setItem("avatarFile", avatar.name);
      navigate(url);
    } else {
      alert("Please upload a file first!");
    }
  };

  return (
    <div className="avatar-uploader">
      <h1>Upload Your Avatar</h1>
      <div className="avatar-preview">
        {avatarURL ? (
          <img src={avatarURL} alt="Avatar Preview" />
        ) : (
          <p>No avatar uploaded</p>
        )}
      </div>
      <div className="avatar-actions">
        <input
          type="file"
          accept="image/png"
          onChange={handleFileChange}
          className="file-input"
        />
        {isFileUploaded && (
          <div className="button-section">
            <button onClick={() => handleRedirect("/weekly-space")}>
              Let's Go
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAvatar;
