import { useParams } from "react-router-dom";
import UpdateVenueForm from "../components/UpdateVenueForm";

const EditVenue = () => {
  const { id } = useParams();

  return (
    <div>
      <UpdateVenueForm venueId={id} />
    </div>
  );
};

export default EditVenue;
