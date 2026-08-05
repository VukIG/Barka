import { useParams, useNavigate, data } from "react-router";
import { useEffect, useState } from "react";
import {
  Clock,
  Anchor,
  Users,
  Star,
  Shield,
  MessageCircle,
  ArrowLeft,
  Check,
} from "lucide-react";
import { API_URL } from "../config/api";
import { getCurrentSession } from "../api/session";

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

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(startIso, endIso) {
  if (!startIso || !endIso) return "";
  const ms = new Date(endIso) - new Date(startIso);
  if (ms <= 0) return "";
  const totalMinutes = Math.round(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function RideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rideData, setRideData] = useState();
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/rides/${id}`)
      .then((response) => response.json())
      .then((data) => setRideData(data))
      .catch((err) => console.log("Error loading rides:", err));
    console.log(data);
  }, [id]);

  if (!rideData || !rideData.ride) {
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

  const ride = rideData.ride;
  const reviewList = rideData.reviews || [];

  const totalSeats = Number(ride.total_seats);
  const seatsTaken = Number(ride.seats_taken);
  const availableSeats = totalSeats - seatsTaken;
  const totalPrice = (ride.price * selectedSeats).toFixed(2);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleBooking = () => {
    if (user) {
      setShowBookingConfirm(true);
      setTimeout(() => {
        setShowBookingConfirm(false);
      }, 3000);
    } else {
      navigate("/auth");
    }
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
                  src={
                    rideData.ride.image
                      ? `${API_URL}/${rideData.ride.image}`
                      : "https://images.unsplash.com/photo-1741197728497-236c57cc880e?..."
                  }
                  alt={`${ride.start_port} to ${ride.end_port}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Trip Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {ride.start_port} → {ride.end_port}
              </h1>

              {/* Route Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Departure</div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {ride.start_port}
                  </div>
                  <div className="text-sm text-gray-600">
                    {ride.departure_site ||
                      "Meeting point shared after booking"}
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

              {/* Boat Details */}
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

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About this ride
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {ride.description}
                </p>
              </div>
            </div>

            {/* Captain Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Captain
              </h2>
              <div className="flex items-start gap-4">
                {/* No avatar in the data — show the first initial in a circle. */}
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">
                  {ride.captain_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {ride.captain_name}
                    </h3>
                    {ride.captain_verified === 1 && (
                      <div className="flex items-center gap-1 text-sm text-blue-600">
                        <Shield className="w-4 h-4" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>Member since {formatDate(ride.member_since)}</span>
                  </div>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <MessageCircle className="w-4 h-4" />
                    <span>Contact Captain</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {reviewList.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Reviews ({reviewList.length})
                </h2>
                <div className="space-y-4">
                  {reviewList.map((review) => (
                    <div
                      key={review.review_id}
                      className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-semibold">
                          {review.reviewer_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">
                              {review.reviewer_name}
                            </span>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          {review.description && (
                            <p className="text-sm text-gray-700 mb-1">
                              {review.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>
                              {review.from_port} → {review.to_port}
                            </span>
                            <span>•</span>
                            <span>{formatDate(review.date)}</span>
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
                  €{ride.price}
                </div>
                <div className="text-sm text-gray-500">per person</div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of seats
                </label>
                <select
                  value={selectedSeats}
                  onChange={(e) => setSelectedSeats(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {renderSeatOptions(availableSeats)}
                </select>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>
                    €{ride.price} × {selectedSeats}{" "}
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

export default RideDetails;
