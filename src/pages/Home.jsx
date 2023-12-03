import React from "react";
import VenuesComponent from "../components/VenuesComponent";
import Hero from "../assets/pexels-muffin-creatives-2468773.jpg";

const Home = () => {
  return (
    <div>
      <div
        className="relative py-32 px-4 md:px-8 lg:px-16 flex bg-cover bg-center text-left flex-col rounded-md"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 rounded-md"></div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-white relative z-10">
          Unwind in a Dreamy Seaside Haven
        </h1>
        <span className="mt-3 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white relative z-10">
          Book venues today at Holidaze
        </span>
      </div>

      <VenuesComponent />
    </div>
  );
};

export default Home;
