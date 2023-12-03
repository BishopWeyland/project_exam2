import React, { useState } from "react";
import api from "../api/Api";
import { useUser } from "../context/UserContext";
import CalendarComponent from "./DateRangePicker";
import { BaseButton } from "./ButtonComponent";

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
    const subtotal = totalNights * pricePerNight;
    const serviceFee = 75;
    const total = subtotal + serviceFee;

    return {
      subtotal: subtotal,
      serviceFee: serviceFee,
      total: total,
    };
  };

  const { userProfile } = useUser();

  const handleBookingSubmit = async () => {
    const totalNights = calculateTotalNights();
    const totalPriceDetails = calculateTotalPrice();

    const bookingData = {
      dateFrom: adjustToTimezone(selectedDates.startDate).toISOString(),
      dateTo: adjustToTimezone(selectedDates.endDate).toISOString(),
      guests: 2,
      venueId: venue.id,
    };

    try {
      if (!userProfile || !userProfile.accessToken) {
        console.error(
          "Error creating booking: Authentication token is missing"
        );
        return;
      }

      const response = await api.createBooking(
        bookingData,
        userProfile.accessToken
      );
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
    <div className="flex flex-col justify-center md:flex-row ml-20">
      <CalendarComponent onChange={handleDateChange} />

      <div className="md:ml-20">
        <p>{venue.price} $ a night</p>
        {calculateTotalNights() > 0 && (
          <div>
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>{`${calculateTotalPrice().subtotal}$`}</p>
            </div>
            <div className="flex justify-between">
              <p>Holidaze Service Fee:</p>
              <p>{`${calculateTotalPrice().serviceFee}$`}</p>
            </div>
            <div className="flex justify-between">
              <p>Total:</p>
              <p>{` ${calculateTotalPrice().total}$`}</p>
            </div>
          </div>
        )}{" "}
        <BaseButton onClick={handleBookingSubmit}>Create Booking</BaseButton>
      </div>
    </div>
  );
};

export default BookingForm;
