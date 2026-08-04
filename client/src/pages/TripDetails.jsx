import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import {
  MapPin,
  Clock,
  Anchor,
  Users,
  Star,
  Shield,
  MessageCircle,
  ArrowLeft,
  Check,
} from "lucide-react";
import { mockTrips, reviews } from "../data/mockData";

function renderStars(rating) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />,
    );
  }
  return stars;
}

function renderSeatOptions(maxSeats) {
  const options = [];
  for (let i = 1; i <= maxSeats; i++) {
    options.push(
      <option key={i} value={i}>
        {i} {i === 1 ? "seat" : "seats"}
      </option>,
    );
  }
  return options;
}

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);

  const trip = mockTrips.find((t) => t.id === id);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Trip not found
          </h1>
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

  const tripReviews = reviews.filter((r) => r.userId !== trip.captain.id);
  const totalPrice = trip.price * selectedSeats;

  const handleBooking = () => {
    setShowBookingConfirm(true);
    setTimeout(() => {
      setShowBookingConfirm(false);
    }, 3000);
  };

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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 md:h-96">
                <img
                  src="https://images.unsplash.com/photo-1741197728497-236c57cc880e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVlZGJvYXQlMjB3YXRlciUyMHRyYW5zcG9ydGF0aW9ufGVufDF8fHx8MTc3NDYxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Boat"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Trip Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {trip.from} → {trip.to}
              </h1>

              {/* Route Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Departure</div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {trip.from}
                  </div>
                  <div className="text-sm text-gray-600">
                    {trip.pickupPoint}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-blue-600 mt-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {trip.date} at {trip.time}
                    </span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-sm text-gray-600 mb-1">Arrival</div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {trip.to}
                  </div>
                  <div className="text-sm text-gray-600">
                    {trip.dropoffPoint}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Duration: {trip.duration}
                  </div>
                </div>
              </div>

              {/* Boat Details */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Boat Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Anchor className="w-5 h-5 text-blue-600" />
                    <span>{trip.boatType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>
                      {trip.seatsAvailable} of {trip.totalSeats} seats available
                    </span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Amenities
                </h2>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About this trip
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {trip.description}
                </p>
              </div>
            </div>

            {/* Captain Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Captain
              </h2>
              <div className="flex items-start gap-4">
                <img
                  src={trip.captain.avatar}
                  alt={trip.captain.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {trip.captain.name}
                    </h3>
                    {trip.captain.verified && (
                      <div className="flex items-center gap-1 text-sm text-blue-600">
                        <Shield className="w-4 h-4" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>
                        {trip.captain.rating} ({trip.captain.reviewCount}{" "}
                        reviews)
                      </span>
                    </div>
                    <span>Member since {trip.captain.memberSince}</span>
                  </div>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <MessageCircle className="w-4 h-4" />
                    <span>Contact Captain</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {tripReviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Reviews
                </h2>
                <div className="space-y-4">
                  {tripReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">
                              {review.userName}
                            </span>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">
                            {review.comment}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{review.route}</span>
                            <span>•</span>
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  €{trip.price}
                </div>
                <div className="text-sm text-gray-500">per person</div>
              </div>

              {/* Seat Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of seats
                </label>
                <select
                  value={selectedSeats}
                  onChange={(e) => setSelectedSeats(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {renderSeatOptions(trip.seatsAvailable)}
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>
                    €{trip.price} × {selectedSeats}{" "}
                    {selectedSeats === 1 ? "seat" : "seats"}
                  </span>
                  <span>€{totalPrice}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>€{totalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
              >
                Book Now
              </button>

              {showBookingConfirm && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Booking confirmed!</span>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                Free cancellation up to 24 hours before departure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;
