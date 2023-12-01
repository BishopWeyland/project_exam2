import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/Api";
import { FaStar } from "react-icons/fa";

const VenuesComponent = () => {
  const [searchInput, setSearchInput] = useState("");
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venuesData = await api.getAllVenues();
        setVenues(venuesData);
        setFilteredVenues(venuesData);
        console.log(venuesData);
      } catch (error) {
        setError("Error fetching venues. Please try again.");
      }
    };

    fetchVenues();
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);

    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVenues(filtered);
  };

  const StarIcon = () => {
    return <FaStar color="black" size={20} />;
  };

  return (
    <div className="shadow-md p-5 mt-10 rounded-md">
      <div className="flex justify-between w-3/5">
        <h2>New venues</h2>
        <input
          type="text"
          placeholder="Search venues..."
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul className="flex flex-wrap justify-center">
        {filteredVenues.map((venue) => (
          <Link
            key={venue.id}
            to={`/venue/${venue.id}`}
            className="p-4 w-80 transform hover:scale-105 transition-transform"
          >
            <img
              className="w-80 h-80 object-cover mb-4 rounded-md"
              src={venue.media && venue.media[0]}
              alt={venue.name}
            />
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-bold mb-2">{venue.name}</h2>
              </div>
              <div className="flex">
                <StarIcon />
                <span className="block text-sm mb-2 ml-2">{venue.rating}</span>
              </div>
            </div>

            <p className="text-sm">${venue.price} a night</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default VenuesComponent;
