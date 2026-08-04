import React from "react";
import { MapPin, Calendar, Anchor } from "lucide-react";

export default function ActiveTrips({ trips, onSelectTrip }) {
  if (!trips || trips.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Trips</h2>
      <div className="space-y-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => onSelectTrip(trip.id)}
            className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <span>{trip.from}</span>
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span>{trip.to}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {trip.date} at {trip.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Anchor className="w-4 h-4" />
                    <span>{trip.boatType}</span>
                  </div>
                  <span>{trip.seatsAvailable} seats available</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  €{trip.price}
                </div>
                <div className="text-sm text-gray-500">per person</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
