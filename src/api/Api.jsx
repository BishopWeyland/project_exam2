import ApiConfig from "./ApiConfig";

const { baseURL } = ApiConfig;

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    Authorization: `Bearer ${token}`,
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

  getVenueById: async (id, includeOwner = false) => {
    try {
      const queryParams = includeOwner ? "?_owner=true" : "";
      const response = await fetch(
        `${baseURL}/holidaze/venues/${id}${queryParams}`,
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
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error(
          "Error creating booking: Authentication token is missing"
        );
        return;
      }

      const response = await fetch(`${baseURL}/holidaze/bookings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Error creating booking:", error.message);
      throw error;
    }
  },
};

export default api;
