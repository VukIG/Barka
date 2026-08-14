import { useRide } from "../context/RideContext";
import { API_URL } from "../config/api";

function RideImage() {
  const { ride } = useRide();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-64 md:h-96">
        <img
          src={
            ride.image
              ? `${API_URL}/${ride.image}`
              : "https://images.unsplash.com/photo-1741197728497-236c57cc880e?..."
          }
          alt={`${ride.start_port} to ${ride.end_port}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default RideImage;
