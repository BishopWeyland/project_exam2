import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import ProfileEditComponent from "../components/ProfileEditComponent";
import DefaultAvatar from "../assets/1891016_user_male_avatar_account_profile_icon.png";
import { BaseButton } from "../components/ButtonComponent";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { userProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div>
        {userProfile && (
          <>
            <div className="flex items-center justify-center">
              <img
                className="rounded-full mr-10 h-24"
                src={userProfile.avatar || DefaultAvatar}
                alt="Profile Avatar"
                onClick={handleEditClick}
              />
              <span>{userProfile.name}</span>
            </div>
          </>
        )}

        {isEditing && <ProfileEditComponent onClose={handleCloseEdit} />}
      </div>

      {userProfile && userProfile.venueManager && (
        <div className="flex justify-center">
          <Link to="/CreateVenue">
            <BaseButton>Create venue</BaseButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
