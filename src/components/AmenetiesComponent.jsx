import React from "react";
import { FaWifi, FaCar, FaCoffee, FaPaw } from "react-icons/fa";

const Amenities = ({ meta }) => {
  return (
    <div className="mt-4 border-b border-gray-500 pb-2">
      <ul className="flex flex-wrap gap-4">
        <li className="flex items-center">
          <FaWifi className="mr-2" />
          <span>Wifi: {meta?.wifi ? "Yes" : "No"}</span>
        </li>
        <li className="flex items-center">
          <FaCoffee className="mr-2" />
          <span>Breakfast: {meta?.breakfast ? "Yes" : "No"}</span>
        </li>
      </ul>
      <ul className="flex flex-wrap gap-4">
        <li className="flex items-center">
          <FaCar className="mr-2" />
          <span>Parking: {meta?.parking ? "Yes" : "No"}</span>
        </li>
        <li className="flex items-center">
          <FaPaw className="mr-2" />
          <span>Pets Allowed: {meta?.pets ? "Yes" : "No"}</span>
        </li>
      </ul>
    </div>
  );
};

export default Amenities;
