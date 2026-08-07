import { Check } from "lucide-react";

export function BookingTimeline({ bookingStatus, touristConfirmed, ownerConfirmed }) {
  const steps = [
    { label: "Request", status: "completed" },
    { label: "Pending", status: bookingStatus === "pending" ? "active" : "completed" },
    { label: "Accepted", status: bookingStatus === "accepted" || bookingStatus === "completed" ? "active" : "inactive" },
    { label: "Completed", status: bookingStatus === "completed" ? "active" : "inactive" },
    { label: "Review", status: touristConfirmed && ownerConfirmed ? "active" : "inactive" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="font-semibold text-gray-900 mb-4">Booking Status</h3>
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300" style={{ zIndex: 0 }} />
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step.status === "completed" || step.status === "active"
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {step.status === "completed" && <Check className="w-5 h-5" />}
              {step.status === "active" && <div className="w-3 h-3 bg-white rounded-full" />}
              {step.status === "inactive" && idx + 1}
            </div>
            <div className="text-xs mt-2 font-medium text-gray-700">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}