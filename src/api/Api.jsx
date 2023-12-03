import ApiConfig from "./ApiConfig";

const { baseURL } = ApiConfig;

const getAuthHeaders = () => {
  const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  const { accessToken } = userProfile;

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    console.error(
      `Error creating booking: ${response.statusText || "Unknown Error"}`,
      await response.json()
    );
    throw new Error(`Error: ${response.statusText || "Unknown Error"}`);
  }

  return response.json();
};

const api = {
  registerUser: async (userData) => {
    try {
      const response = await fetch(`${baseURL}/holidaze/auth/register`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error;
    }
  },

  loginUser: async (credentials) => {
    try {
      const response = await fetch(`${baseURL}/holidaze/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(credentials),
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  },

  getAllVenues: async () => {
    try {
      const response = await fetch(`${baseURL}/holidaze/venues`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Get all venues error:", error.message);
      throw error;
    }
  },

  getVenueById: async (
    venueId,
    includeOwner = true,
    includeBookings = true
  ) => {
    try {
      const queryParams = new URLSearchParams();
      if (includeOwner) {
        queryParams.append("_owner", "true");
      }
      if (includeBookings) {
        queryParams.append("_bookings", "true");
      }

      const response = await fetch(
        `${baseURL}/holidaze/venues/${venueId}?${queryParams.toString()}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      return handleResponse(response);
    } catch (error) {
      console.error("Get venue by ID error:", error.message);
      throw error;
    }
  },

  createBooking: async (bookingData) => {
    try {
      const response = await fetch(`${baseURL}/holidaze/bookings`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingData),
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Error creating booking:", error.message);
      throw error;
    }
  },

  updateProfileMedia: async (username, mediaData) => {
    try {
      const response = await fetch(
        `${baseURL}/holidaze/profiles/${username}/media`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(mediaData),
        }
      );

      return handleResponse(response);
    } catch (error) {
      console.error("Update profile media error:", error.message);
      throw error;
    }
  },

  createVenue: async (venueData) => {
    try {
      const headers = getAuthHeaders();

      const response = await fetch(`${baseURL}/holidaze/venues`, {
        method: "POST",
        headers,
        body: JSON.stringify(venueData),
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Error creating venue:", error.message);
      throw error;
    }
  },

  getAllVenuesByProfile: async (profileName) => {
    try {
      const response = await fetch(
        `${baseURL}/holidaze/profiles/${profileName}/venues`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      return handleResponse(response);
    } catch (error) {
      console.error(`Get all venues by profile error: ${error.message}`);
      throw error;
    }
  },

  getAllBookingsByProfile: async (
    profileName,
    includeCustomer = true,
    includeVenue = true
  ) => {
    try {
      const queryParams = `?_customer=${includeCustomer}&_venue=${includeVenue}`;
      const response = await fetch(
        `${baseURL}/holidaze/profiles/${profileName}/bookings${queryParams}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      return handleResponse(response);
    } catch (error) {
      console.error("Get all bookings by profile error:", error.message);
      throw error;
    }
  },

  updateVenue: async (venueId, venueData) => {
    try {
      const response = await fetch(`${baseURL}/holidaze/venues/${venueId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(venueData),
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Error updating venue:", error.message);
      throw error;
    }
  },

  deleteVenue: async (venueId) => {
    try {
      const response = await fetch(`${baseURL}/holidaze/venues/${venueId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        console.error(
          `Error deleting venue: ${response.statusText || "Unknown Error"}`
        );
        throw new Error(`Error: ${response.statusText || "Unknown Error"}`);
      }
    } catch (error) {
      console.error("Delete venue error:", error.message);
      throw error;
    }
  },
};

export default api;
