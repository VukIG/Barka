import { useNavigate } from "react-router";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRide } from "../context/RideContext";
import { formatDate } from "../utils/dateFormat";

function CaptainCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ride } = useRide();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {t("rideDetails.yourCaptain")}
      </h2>
      <div
        onClick={() => navigate(`/profile/${ride.captain_id}`)}
        className="flex items-start gap-4 cursor-pointer group"
      >
        {/* No avatar in the data — show the first initial in a circle. */}
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">
          {ride.captain_name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {ride.captain_name}
            </h3>
            {ride.captain_verified === 1 && (
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <Shield className="w-4 h-4" />
                <span>{t("rideDetails.verified")}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <span>
              {t("rideDetails.memberSince", {
                date: formatDate(ride.member_since),
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaptainCard;
