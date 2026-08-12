import { Shield } from "lucide-react";
import { useRide } from "../context/RideContext";
import { formatDate } from "../utils/dateFormat";

function CaptainCard() {
  const { ride } = useRide();

  return (
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
        </div>
      </div>
    </div>
  );
}

export default CaptainCard;
