import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(() => {
    const storedData = localStorage.getItem("userProfile");
    return storedData ? JSON.parse(storedData) : null;
  });

  const login = (userData) => {
    setUserProfile(userData);
    localStorage.setItem("userProfile", JSON.stringify(userData));
  };

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem("userProfile");
  };

  useEffect(() => {
    if (!localStorage.getItem("userProfile")) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  return (
    <UserContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
