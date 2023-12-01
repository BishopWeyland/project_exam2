import React, { useState } from "react";
import api from "../api/Api";
import CalendarComponent from "./DateRangePicker";

const BookingForm = ({ venue }) => {
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const adjustToTimezone = (date) => {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000);
  };

  const calculateTotalNights = () => {
    if (selectedDates.startDate && selectedDates.endDate) {
      const diffInTime =
        selectedDates.endDate.getTime() - selectedDates.startDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);
      return Math.ceil(diffInDays);
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const totalNights = calculateTotalNights();
    const pricePerNight = venue.price;
    return totalNights * pricePerNight;
  };

  const handleBookingSubmit = async () => {
    const totalNights = calculateTotalNights();
    const totalPrice = calculateTotalPrice();

    const bookingData = {
      dateFrom: adjustToTimezone(selectedDates.startDate).toISOString(),
      dateTo: adjustToTimezone(selectedDates.endDate).toISOString(),
      guests: 2,
      venueId: venue.id,
    };

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error(
          "Error creating booking: Authentication token is missing"
        );
        return;
      }

      const response = await api.createBooking(bookingData, token);
      console.log("Booking response:", response);

      if (response && response.id) {
        console.log("Booking created. ID:", response.id);
      } else {
        console.error("Invalid booking response:", response);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleDateChange = (date) => {
    console.log("CreateBookings - Date change date:", date);

    setSelectedDates({
      startDate: date.startDate,
      endDate: date.endDate,
    });
  };

  return (
    <div>
      <CalendarComponent onChange={handleDateChange} />

      <div>
        <span>{venue.price} $ a night</span>
        {calculateTotalNights() > 0 && <p>Total: ${calculateTotalPrice()}</p>}
      </div>

      <button onClick={handleBookingSubmit}>Create Booking</button>
    </div>
  );
};

export default BookingForm;
