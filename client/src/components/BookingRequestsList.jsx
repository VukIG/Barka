import { useEffect, useState } from "react";
import { Check, X, Users } from "lucide-react";
import { useRide } from "../context/RideContext";
import { API_URL } from "../config/api";

function BookingRequestsList() {
  const { id } = useRide();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = () => {
    fetch(`${API_URL}/bookings/${id}/bookings`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch((err) => console.log("Error loading bookings:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const respond = (bookingId, action) => {
    fetch(`${API_URL}/bookings/${bookingId}/${action}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => loadBookings())
      .catch((err) => console.log(`Error ${action}ing booking:`, err));
  };

  if (loading || bookings.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Booking Requests ({bookings.length})
      </h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
          >
            <div className="flex items-start gap-3">
              {booking.tourist_image ? (
                <img
                  src={`${API_URL}/${booking.tourist_image}`}
                  alt={`${booking.first_name} ${booking.last_name}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-semibold">
                  {booking.first_name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-gray-900">
                    {booking.first_name} {booking.last_name}
                  </span>
                  <span className="font-semibold text-blue-600">
                    €{booking.cost}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Users className="w-3 h-3" />
                  <span>
                    {booking.number_of_tickets}{" "}
                    {booking.number_of_tickets === 1 ? "seat" : "seats"}
                  </span>
                  {!!booking.status_confirmed && (
                    <span className="text-green-600 font-medium">
                      • Accepted
                    </span>
                  )}
                </div>
                {!booking.status_confirmed && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => respond(booking.id, "accept")}
                      className="flex-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => respond(booking.id, "reject")}
                      className="flex-1 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingRequestsList;
