import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { RideProvider, useRide } from "../context/RideContext";
import { useAuth } from "../context/AuthContext";
import RideImage from "../components/RideImage";
import RideOwnerActions from "../components/RideOwnerActions";
import RideRouteDetails from "../components/RideRouteDetails";
import CaptainCard from "../components/CaptainCard";
import ReviewsList from "../components/ReviewsList";
import BookingRequestsList from "../components/BookingRequestsList";
import BookingSidebar from "../components/BookingSidebar";

function RideDetailsContent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { rideData, ride } = useRide();

  if (!rideData || !ride) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Trip not found
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

  const isOwner = user?.id === ride.captain_id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <RideImage />

            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {ride.start_port} → {ride.end_port}
              </h1>
              {isOwner && <RideOwnerActions />}
              <RideRouteDetails />
            </div>

            <CaptainCard />

            {isOwner && <BookingRequestsList />}

            <ReviewsList />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

function RideDetails() {
  return (
    <RideProvider>
      <RideDetailsContent />
    </RideProvider>
  );
}

export default RideDetails;
