import { useNavigate } from "react-router";
import { Edit, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRide } from "../context/RideContext";
import { API_URL } from "../config/api";

function RideOwnerActions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id, rideData } = useRide();

  const handleRemove = () => {
    if (!window.confirm(t("rideDetails.confirmRemove"))) return;

    fetch(`${API_URL}/rides/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => console.log("Error removing ride:", err));
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start my-5">
      <button
        onClick={() =>
          navigate(`/updateRide/${id}`, { state: { ride: rideData } })
        }
        className="flex items-center gap-2 px-2 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Edit className="w-4 h-4" />
        <span>{t("rideDetails.editRide")}</span>
      </button>
      <button
        onClick={handleRemove}
        className="flex items-center gap-2 px-2 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Trash className="w-4 h-4" />
        <span>{t("rideDetails.removeRide")}</span>
      </button>
    </div>
  );
}

export default RideOwnerActions;
