import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Logo from "../assets/logo.png";
import DefaultAvatar from "../assets/1891016_user_male_avatar_account_profile_icon.png";

const Header = () => {
  const { userProfile } = useUser();

  return (
    <header className="z-10">
      <nav className="flex justify-between items-center mb-5">
        <NavLink to="/">
          <img className="h-20" src={Logo} alt="Logo" />
        </NavLink>

        <NavLink to="/profile" className="flex items-center">
          {userProfile && (
            <>
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={userProfile.avatar || DefaultAvatar}
                alt="User Avatar"
              />
              <span className="ml-2 hidden sm:block">{userProfile.name}</span>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
