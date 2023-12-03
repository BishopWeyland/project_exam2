import Hero from "../assets/pexels-oliver-sjöström-1078981.jpg";
import { BaseButton } from "../components/ButtonComponent";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className=" py-56 px-32 flex justify-center md:h-screen bg-cover bg-center text-center flex-col"
      style={{ backgroundImage: `url(${Hero})` }}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-white">
        Book your next vacation at Holidaze
      </h1>
      <div>
        <Link to="/SignIn">
          <BaseButton className="mr-4">Sign in</BaseButton>
        </Link>
        <Link to="/SignUp">
          <BaseButton>Register user</BaseButton>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
