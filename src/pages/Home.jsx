import React from "react";
import VenuesComponent from "../components/VenuesComponent";
import Hero from "../assets/pexels-muffin-creatives-2468773.jpg";

const Home = () => {
  return (
    <div>
      <div
        className="relative py-56 px-32 flex bg-cover bg-center text-left flex-col rounded-md"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 rounded-md"></div>
        <h1 className="text-9xl text-white relative z-10">
          Unwind in a Dreamy Seaside Haven
        </h1>
        <span className="mt-3 text-2xl text-white relative z-10">
          Book venues today at Holidaze
        </span>
      </div>

      <VenuesComponent />
    </div>
  );
};

export default Home;
