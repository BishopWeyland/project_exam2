import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="z-10">
      <nav className="flex justify-between mb-5">
        <NavLink to="/">
          <img className="h-20" src={Logo} alt="Logo" />
        </NavLink>

        <NavLink to="/profile">
          <span>Hello</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
