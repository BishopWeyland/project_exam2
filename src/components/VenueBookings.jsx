import React, { useState, useEffect } from "react";
import api from "../api/Api";

const VenueBookings = ({ venueId }) => {
  const [venue, setVenue] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venueData = await api.getVenueById(venueId, true);
        setVenue(venueData);
        console.log("Venue Data:", venueData);
      } catch (error) {
        console.error("Error fetching venue details. Please try again.", error);
        setError("Error fetching venue details. Please try again.");
      }
    };

    fetchVenue();
  }, [venueId]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {venue.bookings && venue.bookings.length > 0 ? (
        <>
          <h2>Bookings for this venue:</h2>
          <ul>
            {venue.bookings.map((booking) => (
              <li key={booking.id}>
                <p>Date From: {booking.dateFrom}</p>
                <p>Date To: {booking.dateTo}</p>
                <p>Guests: {booking.guests}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No bookings available for this venue.</p>
      )}
    </div>
  );
};

export default VenueBookings;
