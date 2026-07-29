import { useNavigate } from "react-router";
import { MapPin, Star, Anchor, Users } from "lucide-react";

function TripCard({ trip }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/trip/${trip.id}`)}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Captain Info */}
          <div className="flex items-center gap-3">
            <img
              src={trip.captain.avatar}
              alt={trip.captain.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{trip.captain.name}</h3>
                {trip.captain.verified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {trip.captain.rating} ({trip.captain.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">€{trip.price}</div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
        </div>

        {/* Route & Time */}
        <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Departure</div>
            <div className="font-semibold text-gray-900">{trip.from}</div>
            <div className="text-sm text-gray-600">{trip.time}</div>
          </div>
          <div className="flex flex-col items-center px-4">
            <MapPin className="w-5 h-5 text-blue-500 mb-1" />
            <div className="text-xs text-gray-500">{trip.duration}</div>
          </div>
          <div className="flex-1 text-right">
            <div className="text-sm text-gray-500 mb-1">Arrival</div>
            <div className="font-semibold text-gray-900">{trip.to}</div>
            <div className="text-sm text-gray-600">
              {new Date(`${trip.date} ${trip.time}`).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        {/* Boat Info */}
        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Anchor className="w-4 h-4" />
            <span>{trip.boatType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>
              {trip.seatsAvailable}/{trip.totalSeats} seats available
            </span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {trip.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {trip.amenities.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{trip.amenities.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TripCard