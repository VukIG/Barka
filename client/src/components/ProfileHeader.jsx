import React from "react";
import { Star, Shield, Mail, Phone, Edit } from "lucide-react";

export default function ProfileHeader({ user, userTripsCount, currentUserId }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover shadow-lg"
        />
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            {user.verified && (
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                <Shield className="w-4 h-4" />
                <span>Verified</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{user.rating}</span>
              <span className="text-gray-600">
                ({user.reviewCount} reviews)
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">
              Member since {user.memberSince}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Mail className="w-4 h-4" />
              <span>Message</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </button>
            {currentUserId === "1" && (
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {userTripsCount}
          </div>
          <div className="text-sm text-gray-600">Trips Offered</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {user.reviewCount}
          </div>
          <div className="text-sm text-gray-600">Reviews</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {user.rating}
          </div>
          <div className="text-sm text-gray-600">Rating</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600 mb-1">98%</div>
          <div className="text-sm text-gray-600">Response Rate</div>
        </div>
      </div>
    </div>
  );
}
