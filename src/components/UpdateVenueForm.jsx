import React, { useState, useEffect } from "react";
import api from "../api/Api";
import { BaseButton, DeleteButton } from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";

const UpdateVenueForm = ({ venueId }) => {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [],
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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const response = await api.getVenueById(venueId);
        setVenueData(response);
      } catch (error) {
        console.error("Error fetching venue data:", error.message);
      }
    };

    fetchVenueData();
  }, [venueId]);

  const handleUpdateVenue = async () => {
    try {
      await api.updateVenue(venueId, venueData);
    } catch (error) {
      console.error("Error updating venue:", error.message);
    } finally {
      navigate(`/venue/${venueId}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenueData({
      ...venueData,
      [name]: value,
    });
  };

  const handleMetaChange = (key) => {
    setVenueData({
      ...venueData,
      meta: {
        ...venueData.meta,
        [key]: !venueData.meta[key],
      },
    });
  };

  const handleDeleteVenue = async () => {
    try {
      await api.deleteVenue(venueId);
    } catch (error) {
      console.error("Error deleting venue:", error.message);
    } finally {
      navigate("/profile");
    }
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
              value={venueData.name}
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-2">
            Image URL:
            <input
              className="w-full md:w-72 lg:w-96"
              type="text"
              name="imgUrl"
              value={venueData.imgUrl}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="flex flex-col md:flex-row mb-4 md:mr-4">
          <label className="mb-2">
            Description:
            <textarea
              className="w-full md:w-72 lg:w-96 mb-4 md:mb-0"
              name="description"
              value={venueData.description}
              onChange={handleInputChange}
              style={{ resize: "none" }}
            />
          </label>
          <div className="flex-col mb-4 md:w-72 lg:w-96">
            <div className="flex flex-col md:flex-row w-full justify-between">
              <label className="mb-2 md:mr-2">
                Price per night:
                <input
                  className="w-full md:w-32 lg:w-44"
                  type="number"
                  name="price"
                  value={venueData.price}
                  onChange={handleInputChange}
                />
              </label>
              <label className="mb-2">
                Rating:
                <input
                  className="w-full md:w-32 lg:w-44"
                  type="number"
                  name="rating"
                  value={venueData.rating}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="flex justify-between">
              <label className="mb-2 md:mr-2">
                Wifi:
                <input
                  type="checkbox"
                  checked={venueData.meta.wifi}
                  onChange={() => handleMetaChange("wifi")}
                />
              </label>
              <label className="mb-2 md:mr-2">
                Parking:
                <input
                  type="checkbox"
                  checked={venueData.meta.parking}
                  onChange={() => handleMetaChange("parking")}
                />
              </label>
              <label className="mb-2 md:mr-2">
                Breakfast:
                <input
                  type="checkbox"
                  checked={venueData.meta.breakfast}
                  onChange={() => handleMetaChange("breakfast")}
                />
              </label>
              <label className="mb-2">
                Pets:
                <input
                  type="checkbox"
                  checked={venueData.meta.pets}
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
              value={venueData.location.country}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "location",
                    value: {
                      ...venueData.location,
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
              value={venueData.location.city}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "location",
                    value: {
                      ...venueData.location,
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
              value={venueData.location.address}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "location",
                    value: {
                      ...venueData.location,
                      address: e.target.value,
                    },
                  },
                })
              }
            />
          </label>
        </div>

        <BaseButton className="mr-4" type="button" onClick={handleUpdateVenue}>
          Update Venue
        </BaseButton>
        <DeleteButton type="button" onClick={handleDeleteVenue}>
          Delete Venue
        </DeleteButton>
      </form>
    </div>
  );
};

export default UpdateVenueForm;
