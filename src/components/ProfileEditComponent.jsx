import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import api from "../api/Api";

const ProfileEditComponent = ({ onClose }) => {
  const { userProfile, login } = useUser();
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatar || "");

  const handleAvatarChange = async () => {
    try {
      const response = await api.updateProfileMedia(userProfile.name, {
        avatar: avatarUrl,
      });

      login({
        ...userProfile,
        avatar: response.avatar,
      });

      onClose();
    } catch (error) {
      console.error("Error updating avatar:", error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <label>
          Edit avatar-url:
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </label>
        <button onClick={handleAvatarChange}>Edit</button>
      </div>
    </div>
  );
};

export default ProfileEditComponent;
