import { useParams, useNavigate } from "react-router";
import {
  MapPin,
  Clock,
  Anchor,
  Users,
  Shield,
  ArrowLeft,
  Check,
} from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 md:h-96">
                <img
                  src="https://images.unsplash.com/photo-1741197728497-236c57cc880e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVlZGJvYXQlMjB3YXRlciUyMHRyYW5zcG9ydGF0aW9ufGVufDF8fHx8MTc3NDYxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Boat"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Trip Main Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {trip.from} → {trip.to}
              </h1>

              {/* Route Schedule & Pickup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Departure</div>
                  <div className="font-semibold text-gray-900 mb-1">{trip.from}</div>
                  <div className="text-sm text-gray-600">{trip.pickupPoint}</div>
                  <div className="flex items-center gap-1 text-sm text-blue-600 mt-2">
                    <Clock className="w-4 h-4" />
                    <span>{trip.date} at {trip.time}</span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-sm text-gray-600 mb-1">Arrival</div>
                  <div className="font-semibold text-gray-900 mb-1">{trip.to}</div>
                  <div className="text-sm text-gray-600">{trip.dropoffPoint}</div>
                  <div className="text-sm text-gray-600 mt-2">
                    Duration: {trip.duration}
                  </div>
                </div>
              </div>

              {/* Boat Details */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Boat Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Anchor className="w-5 h-5 text-blue-600" />
                    <span>{trip.boatType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>{trip.seatsAvailable} of {trip.totalSeats} seats available</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {trip.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About this trip</h2>
                <p className="text-gray-700 leading-relaxed">{trip.description}</p>
              </div>
            </div>

            {/* Captain Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Captain</h2>
              <div className="flex items-start gap-4">
                <img
                  src={trip.captain.avatar}
                  alt={trip.captain.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{trip.captain.name}</h3>
                    {trip.captain.verified && (
                      <div className="flex items-center gap-1 text-sm text-blue-600">
                        <Shield className="w-4 h-4" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Member since {trip.captain.memberSince}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Static Booking Sidebar Layout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  €{trip.price}
                </div>
                <div className="text-sm text-gray-500">per person</div>
              </div>

              <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;