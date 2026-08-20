import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Check, X, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRide } from "../context/RideContext";
import { API_URL } from "../config/api";
import Avatar from "./Avatar";

function BookingRequestsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        {t("rideDetails.bookingRequestsTitle", { count: bookings.length })}
      </h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
          >
            <div className="flex items-start gap-3">
              <Avatar
                src={
                  booking.tourist_image
                    ? `${API_URL}/${booking.tourist_image}`
                    : null
                }
                name={`${booking.first_name} ${booking.last_name}`}
                initials={booking.first_name.charAt(0)}
                alt={`${booking.first_name} ${booking.last_name}`}
                onClick={() => navigate(`/profile/${booking.tourist_id}`)}
                className="w-10 h-10 rounded-full object-cover cursor-pointer flex-shrink-0"
                fallbackClassName="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-semibold cursor-pointer flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    onClick={() => navigate(`/profile/${booking.tourist_id}`)}
                    className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    {booking.first_name} {booking.last_name}
                  </span>
                  <span className="font-semibold text-blue-600">
                    €{booking.cost}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Users className="w-3 h-3" />
                  <span>
                    {t("common.seatsCount", {
                      count: booking.number_of_tickets,
                    })}
                  </span>
                  {!!booking.status_confirmed && (
                    <span className="text-green-600 font-medium">
                      • {t("rideDetails.accepted")}
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
                      {t("rideDetails.accept")}
                    </button>
                    <button
                      onClick={() => respond(booking.id, "reject")}
                      className="flex-1 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      {t("rideDetails.reject")}
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
