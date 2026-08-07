import { Check, Clock, X } from "lucide-react";

export function BookingStatusBanner({
  bookingStatus,
  touristConfirmed,
  ownerConfirmed,
  onAccept,
  onReject,
  onConfirmTrip,
  onShowReview,
}) {
  return (
    <div className="border-t border-gray-200 px-6 py-4">
      {bookingStatus === "pending" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-yellow-900">
              <Clock className="w-5 h-5" />
              <h3 className="font-semibold">Booking Request Pending</h3>
            </div>
            <p className="text-sm text-yellow-700">Waiting for captain's response...</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={onAccept}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Accept (Captain)
              </button>
              <button
                onClick={onReject}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Reject (Captain)
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingStatus === "accepted" && !touristConfirmed && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-700 mb-3">
            <Check className="w-5 h-5" />
            <h3 className="font-semibold">Booking Confirmed!</h3>
          </div>
          <p className="text-sm text-green-700 mb-3">Your ride has been confirmed by the captain.</p>
          <div className="border-t border-green-300 pt-3 mt-3">
            <p className="text-sm font-medium text-gray-900 mb-2">Was this ride completed?</p>
            <div className="flex gap-2">
              <button
                onClick={onConfirmTrip}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Yes, Confirm
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Not Yet
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingStatus === "completed" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-700 mb-3">
            <Check className="w-5 h-5" />
            <h3 className="font-semibold">Ride Completed!</h3>
          </div>
          {touristConfirmed && ownerConfirmed && (
            <button
              onClick={onShowReview}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Leave a Review
            </button>
          )}
        </div>
      )}

      {bookingStatus === "rejected" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-700">
            <X className="w-5 h-5" />
            <div>
              <h3 className="font-semibold">Booking Declined</h3>
              <p className="text-sm">Unfortunately, this booking was not accepted.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}