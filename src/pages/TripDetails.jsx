import { useParams, useNavigate } from "react-router";
import { mockTrips } from "../data/mockData";

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const trip = mockTrips.find((t) => t.id === id);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip not found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
        >
          ← Back to results
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {trip.from} → {trip.to}
        </h1>

        <p className="text-gray-600 mb-4">
          Date: {trip.date} at {trip.time}
        </p>

        <div className="border-t pt-4">
          <p className="text-2xl font-bold text-blue-600 mb-4">€{trip.price}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;