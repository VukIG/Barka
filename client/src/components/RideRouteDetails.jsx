import { Clock, Anchor, Users } from "lucide-react";
import { useRide } from "../context/RideContext";
import { formatDate, formatTime, formatDuration } from "../utils/dateFormat";

function RideRouteDetails() {
  const { ride } = useRide();
  const totalSeats = Number(ride.total_seats);
  const seatsTaken = Number(ride.seats_taken);
  const availableSeats = totalSeats - seatsTaken;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
        <div>
          <div className="text-sm text-gray-600 mb-1">Departure</div>
          <div className="font-semibold text-gray-900 mb-1">
            {ride.start_port}
          </div>
          <div className="text-sm text-gray-600">
            {ride.departure_site || "Meeting point shared after booking"}
          </div>
          <div className="flex items-center gap-1 text-sm text-blue-600 mt-2">
            <Clock className="w-4 h-4" />
            <span>
              {formatDate(ride.date)} at {formatTime(ride.date)}
            </span>
          </div>
        </div>
        <div className="text-left md:text-right">
          <div className="text-sm text-gray-600 mb-1">Arrival</div>
          <div className="font-semibold text-gray-900 mb-1">
            {ride.end_port}
          </div>
          <div className="text-sm text-gray-600">
            {ride.arrival_site || "Drop-off shared after booking"}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Duration: {formatDuration(ride.date, ride.expected_arrival)}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Boat Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Anchor className="w-5 h-5 text-blue-600" />
            <span>
              {ride.boat_name} · {ride.boat_type.replace("_", " ")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-5 h-5 text-blue-600" />
            <span>
              {availableSeats} of {totalSeats} seats available
            </span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          About this ride
        </h2>
        <p className="text-gray-700 leading-relaxed">{ride.description}</p>
      </div>
    </>
  );
}

export default RideRouteDetails;
