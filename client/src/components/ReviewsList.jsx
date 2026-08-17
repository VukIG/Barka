import { useNavigate } from "react-router";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRide } from "../context/RideContext";
import { formatDate } from "../utils/dateFormat";

function renderStars(rating) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />,
    );
  }
  return stars;
}

function ReviewsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { reviews } = useRide();

  if (reviews.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {t("rideDetails.reviewsTitle", { count: reviews.length })}
      </h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.review_id}
            className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
          >
            <div className="flex items-start gap-3">
              <div
                onClick={() => navigate(`/profile/${review.reviewer_id}`)}
                className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-semibold cursor-pointer flex-shrink-0"
              >
                {review.reviewer_name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    onClick={() => navigate(`/profile/${review.reviewer_id}`)}
                    className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  >
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
  );
}

export default ReviewsList;
