import { useNavigate } from "react-router";
import { MapPin, Star, Anchor, Users } from "lucide-react";

function TripCard({ trip }) {
  const navigate = useNavigate();

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const departure = new Date(trip.date);
  const arrival = new Date(trip.expected_arrival);
  let durationHours = ((arrival - departure) / (1000 * 60 * 60)).toFixed(1);
  if (durationHours < 0) {
    durationHours *= -1;
  }
  return (
    <div
      onClick={() => navigate(`/trip/${trip.id}`)}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Captain Info — built from first_name + last_name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
              {/* No profile image column yet, so show initials as a placeholder */}
              {trip.first_name?.[0]}
              {trip.last_name?.[0]}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {trip.first_name} {trip.last_name}
              </h3>
              <h3>
                {new Date(trip.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h3>
              {/* Rating comes from the review table — not joined yet, placeholder for now */}
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Star className="w-4 h-4" />
                <span>No reviews yet</span>
              </div>
            </div>
          </div>

          {/* Price — ticket_cost */}
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              €{trip.ticket_cost}
            </div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
        </div>

        {/* Route & Time */}
        <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Departure</div>
            {/* Port NAME is missing from the data — showing the id until the JOIN is aliased */}
            <div className="font-semibold text-gray-900">{trip.fromPort}</div>
            <div className="text-sm text-gray-600">{formatTime(trip.date)}</div>
          </div>
          <div className="flex flex-col items-center px-4">
            <MapPin className="w-5 h-5 text-blue-500 mb-1" />
            <div className="text-xs text-gray-500">{durationHours}h</div>
          </div>
          <div className="flex-1 text-right">
            <div className="text-sm text-gray-500 mb-1">Arrival</div>
            <div className="font-semibold text-gray-900">{trip.toPort}</div>
            <div className="text-sm text-gray-600">
              {formatTime(trip.expected_arrival)}
            </div>
          </div>
        </div>

        {/* Boat Info */}
        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Anchor className="w-4 h-4" />
            <span>{trip.type}</span> {/* boat type: "motorboat" */}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{trip.seats} seats</span>{" "}
            {/* total seats; availability needs bookings */}
          </div>
        </div>

        {/* Cross-border badge — you have this flag, might as well use it */}
        {trip.cross_border === 1 && (
          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
            🌐 Crosses border · passport required
          </span>
        )}
      </div>
    </div>
  );
}

export default TripCard;
