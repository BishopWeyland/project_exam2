import React, { useEffect, useState } from "react";
import api from "../api/Api";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const BookingsByProfileComponent = () => {
  const { userProfile } = useUser();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingsByProfile = async () => {
      try {
        if (userProfile) {
          const bookingsData = await api.getAllBookingsByProfile(
            userProfile.name,
            true,
            true
          );
          setBookings(bookingsData);
        }
      } catch (error) {
        setError("Error fetching bookings by profile. Please try again.");
      }
    };

    fetchBookingsByProfile();
  }, [userProfile]);

  if (!userProfile || (bookings.length === 0 && !error)) {
    return null;
  }

  return (
    <div className="shadow-md p-5 mt-10 rounded-md">
      <h2>My Bookings</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul className="flex flex-wrap justify-center">
        {bookings.map((booking) => (
          <li
            key={booking.id}
            className="p-4 w-80 transform hover:scale-105 transition-transform"
          >
            <Link to={`/venue/${booking.venue.id}`}>
              <img
                className="w-full h-48 object-cover mb-4 rounded-md"
                src={booking.venue.media && booking.venue.media[0]}
                alt={booking.venue.name}
              />
              <h2 className="text-lg font-bold mb-2">{booking.venue.name}</h2>
            </Link>
            <div className="mb-4">
              <span className="block text-sm mb-2">
                {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsByProfileComponent;
