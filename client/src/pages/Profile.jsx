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
import { mockTrips, reviews } from "../data/mockData";
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function Profile({}) {
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    fetch(`${API_URL}/users/me`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfileData(data);
      })
      .catch((err) => console.log("Error loading rides:", err));
  }, []);

  const navigate = useNavigate();
  const userTrips = mockTrips;
  const userReviews = reviews;

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            User not found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={`${API_URL}/${profileData.user.image_path}`}
              alt={profileData.user.user_name}
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profileData.user.first_name}
                </h1>
                {profileData.user.verified && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
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
                    ({profileData.user.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">
                  Member since:{" "}
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
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {profileData.trips.length}
              </div>
              <div className="text-sm text-gray-600">Trips Offered</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {profileData.reviews.length}
              </div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
           
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {profileData.user.description}
          </p>
        </div>

        {/* Active Trips */}
        {profileData.trips.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Active Trips
            </h2>
            <div className="space-y-4">
              {profileData.trips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/trip/${trip.id}`)}
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
                        <span>{trip.boat_seats} seats available</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        €{trip.ticket_cost}
                      </div>
                      <div className="text-sm text-gray-500">per person</div>
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
              Reviews ({userReviews.length})
            </h2>
            <div className="space-y-6">
              {profileData.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {review.userName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{review.route}</span>
                            <span>•</span>
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
