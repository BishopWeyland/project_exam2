import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/Api";
import StarRating from "./StarRating";
import Amenities from "./AmenetiesComponent";
import BookingForm from "./CreateBookings";
import VenueBookings from "./VenueBookings"; // Import the new component
import { useUser } from "../context/UserContext"; // Import the UserContext

const SingleVenue = () => {
  const { id } = useParams();
  const { userProfile } = useUser(); // Access the user profile from the context
  const [venue, setVenue] = useState({});
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venueData = await api.getVenueById(id, true, true);
        setVenue(venueData);

        // Check if the user's profile name matches the venue owner's name
        setIsOwner(userProfile && userProfile.name === venueData.owner.name);
      } catch (error) {
        setError("Error fetching venue details. Please try again.");
      }
    };

    fetchVenue();
  }, [id, userProfile]);

  return (
    <div>
      {venue.owner && (
        <div className="flex items-center mb-1 w-1/2">
          <h1 className="mr-5">{venue.name}</h1>
          <span className="mr-5"> hosted by {venue.owner.name}</span>
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={venue.owner.avatar}
            alt={venue.owner.name}
          />
        </div>
      )}
      <div className="flex mb-2">
        <ul className="list-none p-0 m-0 flex">
          <li className="mr-2">
            <span className="text-sm">
              {venue.location && venue.location.country}
            </span>
          </li>
          <li className="mr-2">
            <span className="text-sm">
              {venue.location && venue.location.city},
            </span>
          </li>
          <li>
            <span className="text-sm">
              {venue.location && venue.location.address},
            </span>
          </li>
        </ul>
      </div>

      <img
        className="w-full h-96 object-cover rounded-md"
        src={venue.media && venue.media[0]}
        alt={venue.name}
      />
      <div className="flex shadow-md p-5 rounded-md">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="overflow-y-auto max-h-[200px]">
          <div className="flex">
            <StarRating rating={venue.rating} maxRating={5} />
          </div>
          <Amenities meta={venue.meta} />
          <p className="text-sm">{venue.description}</p>
        </div>

        <div>
          {isOwner ? (
            // If the user is the owner, display VenueBookings component
            <VenueBookings venueId={id} />
          ) : (
            // Otherwise, display BookingForm component
            <BookingForm venue={venue} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleVenue;
