import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/Api";
import { useUser } from "../context/UserContext";
import { BaseButton } from "../components/ButtonComponent";

const VenuesByProfileComponent = () => {
  const { userProfile } = useUser();
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenuesByProfile = async () => {
      try {
        if (userProfile) {
          const venuesData = await api.getAllVenuesByProfile(userProfile.name);
          setVenues(venuesData);
          setFilteredVenues(venuesData);
        }
      } catch (error) {
        setError("Error fetching venues by profile. Please try again.");
      }
    };

    fetchVenuesByProfile();
  }, [userProfile]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setFilteredVenues((prevVenues) =>
      prevVenues.filter((venue) =>
        venue.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  if (!venues.length) {
    return (
      <div className="shadow-md p-5 mt-10 rounded-md">
        <h2>No venues found for your profile.</h2>
      </div>
    );
  }

  return (
    <div className="shadow-md p-5 mt-10 rounded-md">
      <div className="flex justify-between w-3/5">
        <h2>My venues</h2>
        <input
          type="text"
          placeholder="Search venues..."
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
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default VenuesByProfileComponent;
