import { useState } from "react";
import { useNavigate } from "react-router";
import { MessageCircle, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRide } from "../context/RideContext";
import { API_URL } from "../config/api";

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

function BookingSidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id, ride } = useRide();
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);

  const totalSeats = Number(ride.total_seats);
  const seatsTaken = Number(ride.seats_taken);
  const availableSeats = totalSeats - seatsTaken;
  const totalPrice = (ride.price * selectedSeats).toFixed(2);

  const handleBooking = () => {
    if (!user) {
      alert("You must be logged in!");
      navigate("/auth");
      return;
    }

    fetch(`${API_URL}/bookings/createBooking`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rideId: id,
        numberOfTickets: selectedSeats,
        cost: totalPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.message || "Booking failed.");
          return;
        }
        setShowBookingConfirm(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        console.log("Booking error:", err);
        alert("Something went wrong.");
      });
  };

  return (
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
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
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
  );
}

export default BookingSidebar;
