import React, { useState } from "react";
import api from "../api/Api";
import { BaseButton } from "../components/ButtonComponent";

const VenueCreationForm = ({ onCreateVenue }) => {
  const [newVenueData, setNewVenueData] = useState({
    name: "",
    media: [],
    description: "",
    price: 0,
    maxGuests: 1,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });

  const handleCreateVenue = async () => {
    try {
      if (
        !newVenueData.name ||
        !newVenueData.description ||
        !newVenueData.price
      ) {
        console.error(
          "Error creating venue: Name, description, and price are required fields"
        );

        return;
      }

      const locationObject = {
        address: newVenueData.location.address || "Unknown",
        city: newVenueData.location.city || "Unknown",
        zip: newVenueData.location.zip || "Unknown",
        country: newVenueData.location.country || "Unknown",
        continent: newVenueData.location.continent || "Unknown",
        lat: newVenueData.location.lat || 0,
        lng: newVenueData.location.lng || 0,
      };

      const requestData = {
        name: newVenueData.name,
        description: newVenueData.description,
        media: newVenueData.imgUrl ? [newVenueData.imgUrl] : [],
        price: Number(newVenueData.price),
        maxGuests: 1,
        rating: 0,
        meta: newVenueData.meta,
        location: locationObject,
      };

      const response = await api.createVenue(requestData);

      console.log("Create Venue Response:", response);

      if (response.statusCode === 400) {
        console.error(
          "Venue creation failed due to validation errors:",
          response.errors
        );

        return;
      }

      console.log("New Venue Created:", response);

      onCreateVenue(response.id);
    } catch (error) {
      console.error("Error creating venue:", error.message);
    }
  };

  const handleNewVenueChange = (e) => {
    const { name, value } = e.target;
    setNewVenueData({
      ...newVenueData,
      [name]: value,
    });
  };

  const handleMetaChange = (key) => {
    setNewVenueData({
      ...newVenueData,
      meta: {
        ...newVenueData.meta,
        [key]: !newVenueData.meta[key],
      },
    });
  };

  return (
    <div className="w-full py-20 shadow-md flex flex-col justify-center h-full md:py-32">
      <form className="w-72 md:w-min mx-auto">
        <h2>Create New Venue</h2>
        <div className="flex flex-col md:flex-row mb-4">
          <label className="mb-2 md:mr-4">
            Name:
            <input
              className="w-full md:w-72 lg:w-96"
              type="text"
              name="name"
              value={newVenueData.name}
              onChange={handleNewVenueChange}
            />
          </label>
          <label className="mb-2">
            Image URL:
            <input
              className="w-full md:w-72 lg:w-96"
              type="text"
              name="imgUrl"
              value={newVenueData.imgUrl}
              onChange={handleNewVenueChange}
            />
          </label>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 md:mr-4">
            <label className="flex flex-col">
              Description:
              <textarea
                className="w-full md:w-72 lg:w-96 mb-4 md:mb-0"
                name="description"
                value={newVenueData.description}
                onChange={handleNewVenueChange}
                style={{ resize: "none" }}
              />
            </label>
          </div>
          <div className="flex-col  mb-4 md:w-72 lg:w-96">
            <div className="flex flex-col md:flex-row w-full justify-between">
              <label className="mb-2 md:mr-2">
                Price per night:
                <input
                  className="w-full md:w-32 lg:w-44"
                  type="number"
                  name="price"
                  value={newVenueData.price}
                  onChange={handleNewVenueChange}
                />
              </label>
              <label className="mb-2">
                Rating:
                <input
                  className="w-full md:w-32 lg:w-44"
                  type="number"
                  name="rating"
                  value={newVenueData.rating}
                  onChange={handleNewVenueChange}
                />
              </label>
            </div>

            <div className="flex justify-between">
              <label className="mb-2 md:mr-2">
                Wifi:
                <input
                  type="checkbox"
                  checked={newVenueData.meta.wifi}
                  onChange={() => handleMetaChange("wifi")}
                />
              </label>
              <label className="mb-2 md:mr-2">
                Parking:
                <input
                  type="checkbox"
                  checked={newVenueData.meta.parking}
                  onChange={() => handleMetaChange("parking")}
                />
              </label>
              <label className="mb-2 md:mr-2">
                Breakfast:
                <input
                  type="checkbox"
                  checked={newVenueData.meta.breakfast}
                  onChange={() => handleMetaChange("breakfast")}
                />
              </label>
              <label className="mb-2">
                Pets:
                <input
                  type="checkbox"
                  checked={newVenueData.meta.pets}
                  onChange={() => handleMetaChange("pets")}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-4">
          <label className="mb-2 md:mr-4">
            Country:
            <input
              className="w-full md:w-72 lg:w-96"
              type="text"
              name="country"
              value={newVenueData.location.country}
              onChange={(e) =>
                handleNewVenueChange({
                  target: {
                    name: "location",
                    value: {
                      ...newVenueData.location,
                      country: e.target.value,
                    },
                  },
                })
              }
            />
          </label>
          <label className="mb-2">
            City:
            <input
              className="w-full md:w-72 lg:w-96"
              type="text"
              name="city"
              value={newVenueData.location.city}
              onChange={(e) =>
                handleNewVenueChange({
                  target: {
                    name: "location",
                    value: {
                      ...newVenueData.location,
                      city: e.target.value,
                    },
                  },
                })
              }
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="flex flex-col">
            Address:
            <input
              className="w-full md:w-72 lg:w-96"
              type="text"
              name="address"
              value={newVenueData.location.address}
              onChange={(e) =>
                handleNewVenueChange({
                  target: {
                    name: "location",
                    value: {
                      ...newVenueData.location,
                      address: e.target.value,
                    },
                  },
                })
              }
            />
          </label>
        </div>

        <BaseButton type="button" onClick={handleCreateVenue}>
          Create Venue
        </BaseButton>
      </form>
    </div>
  );
};

export default VenueCreationForm;
