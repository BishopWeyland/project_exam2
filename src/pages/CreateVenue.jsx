import React from "react";
import VenueCreationForm from "../components/VenueCreationForm";

import { useNavigate } from "react-router-dom";

const CreateVenue = () => {
  const navigate = useNavigate();

  const onCreateVenue = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  return (
    <div>
      <VenueCreationForm onCreateVenue={onCreateVenue} />
    </div>
  );
};

export default CreateVenue;
