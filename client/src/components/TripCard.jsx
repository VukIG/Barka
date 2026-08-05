import { useNavigate } from "react-router";
import { MapPin, Star, Anchor, Users } from "lucide-react";

function TripCard({ ride }) {
  const navigate = useNavigate();

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const departure = new Date(ride.date);
  const arrival = new Date(ride.expected_arrival);
  let durationHours = ((arrival - departure) / (1000 * 60 * 60)).toFixed(1);
  if (durationHours < 0) {
    durationHours *= -1;
  }
  return (
    <div
      onClick={() => navigate(`/rides/${ride.id}`)}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
              {ride.first_name?.[0]}
              {ride.last_name?.[0]}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {ride.first_name} {ride.last_name}
              </h3>
              <h3>
                {new Date(ride.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h3>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Star className="w-4 h-4" />
                <span>No reviews yet</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              €{ride.ticket_cost}
            </div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Departure</div>
            <div className="font-semibold text-gray-900">{ride.fromPort}</div>
            <div className="text-sm text-gray-600">{formatTime(ride.date)}</div>
          </div>
          <div className="flex flex-col items-center px-4">
            <MapPin className="w-5 h-5 text-blue-500 mb-1" />
            <div className="text-xs text-gray-500">{durationHours}h</div>
          </div>
          <div className="flex-1 text-right">
            <div className="text-sm text-gray-500 mb-1">Arrival</div>
            <div className="font-semibold text-gray-900">{ride.toPort}</div>
            <div className="text-sm text-gray-600">
              {formatTime(ride.expected_arrival)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Anchor className="w-4 h-4" />
            <span>{ride.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{ride.seats} seats</span>{" "}
          </div>
        </div>

        {ride.cross_border === 1 && (
          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
            🌐 Crosses border · passport required
          </span>
        )}
      </div>
    </div>
  );
}

export default TripCard;
