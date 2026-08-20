import { useParams, useNavigate } from "react-router";
import {
  Star,
  Shield,
  Calendar,
  Anchor,
  MapPin,
  Edit,
  Mail,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";

export default function Profile() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setProfileData(undefined);
    fetch(`${API_URL}/users/${id}`)
      .then((response) => response.json())
      .then((data) => setProfileData(data.user ? data : null))
      .catch((err) => console.log("Error loading profile:", err));
  }, [id]);

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t("profile.userNotFound")}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700"
          >
            {t("common.backToHome")}
          </button>
        </div>
      </div>
    );
  }

  const isOwnProfile = user?.id === profileData.user.id;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar
              src={
                profileData.user.image_path
                  ? `${API_URL}/${profileData.user.image_path}`
                  : null
              }
              name={profileData.user.user_name}
              initials={`${profileData.user.user_name[0] ?? ""}${profileData.user.user_name[1] ?? ""}`}
              alt={profileData.user.user_name}
              className="w-32 h-32 rounded-full object-cover shadow-lg"
              fallbackClassName="w-32 h-32 rounded-full shadow-lg bg-blue-600 flex items-center justify-center text-white text-4xl font-semibold uppercase"
            />
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profileData.user.first_name}
                </h1>
                {profileData.user.verified ? (
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    <Shield className="w-4 h-4" />
                    <span>{t("rideDetails.verified")}</span>
                  </div>
                ) : (
                  <p>{t("profile.unverified")}</p>
                )}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {profileData?.user?.average_rating != null ? (
                      <div>{profileData.user.average_rating}</div>
                    ) : (
                      0
                    )}
                  </span>
                  <span className="text-gray-600">
                    {t("profile.reviewsCountSuffix", {
                      count: profileData.user.reviewCount,
                    })}
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">
                  {t("profile.memberSinceLabel")}{" "}
                  {new Date(profileData.user.created).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
              {isOwnProfile && (
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4" />
                    <span>{t("profile.editProfile")}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {profileData.trips.length}
              </div>
              <div className="text-sm text-gray-600">
                {t("profile.tripsOffered")}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {profileData.reviews.length}
              </div>
              <div className="text-sm text-gray-600">
                {t("profile.reviewsHeading")}
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("profile.aboutHeading")}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {profileData.user.description}
          </p>
        </div>

        {/* Active Trips */}
        {profileData.trips.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t("profile.activeTripsHeading")}
            </h2>
            <div className="space-y-4">
              {profileData.trips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/rides/${trip.id}`)}
                  className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                          <span>{trip.from_port}</span>
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <span>{trip.to_port}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(trip.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}{" "}
                            at{" "}
                            {new Date(trip.date).toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Anchor className="w-4 h-4" />
                          <span>{trip.boatType}</span>
                        </div>
                        <span>
                          {t("profile.seatsAvailableSuffix", {
                            count: trip.boat_seats,
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        €{trip.ticket_cost}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t("common.perPerson")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {profileData.reviews.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t("profile.reviewsSectionTitle", {
                count: profileData.reviews.length,
              })}
            </h2>
            <div className="space-y-6">
              {profileData.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                >
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={
                        review.reviewer_image
                          ? `${API_URL}/${review.reviewer_image}`
                          : null
                      }
                      name={review.reviewer_name}
                      initials={`${review.reviewer_name[0] ?? ""}${review.reviewer_name[1] ?? ""}`}
                      alt={review.reviewer_name}
                      onClick={() => navigate(`/profile/${review.reviewer_id}`)}
                      className="w-10 h-10 rounded-full object-cover cursor-pointer flex-shrink-0"
                      fallbackClassName="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold uppercase cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3
                            onClick={() => navigate(`/profile/${review.reviewer_id}`)}
                            className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors inline-block"
                          >
                            {review.reviewer_name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{review.route}</span>
                            <span>
                              {new Date(review.date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {review.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
