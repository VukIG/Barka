import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Calendar, Clock, Euro, Anchor, Users, Plus, X } from "lucide-react";
import { croatianLocations, boatTypes } from "../data/mockData";
import DatePicker from "../components/DatePicker";
import { format } from "date-fns";

function OfferRide(){
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [selectedDate, setSelectedDate] = useState(undefined);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    time: "",
    price: "",
    totalSeats: "",
    boatType: "",
    pickupPoint: "",
    dropoffPoint: "",
    description: "",
  });


   async function handleSubmit (e) {
    const API_URL = "http://localhost:5000";
    const response = await fetch(`${API_URL}/rides/post-ride`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      throw new Error(`HTTP errorstatus: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    setShowSuccess(true);

  }

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const removeAmenity = (amenity) => {
    setAmenities(amenities.filter((a) => a !== amenity));
  };

  const commonAmenities = ["WiFi", "Snacks", "Drinks", "Bathroom", "Life Jackets", "Waterproof Storage", "Music", "Sundeck"];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Offer a Boat Ride</h1>
          <p className="text-lg text-gray-600">
            Share your boat trip and earn money while connecting with passengers
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {/* Route Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Route Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure City
                </label>
                <select
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select departure</option>
                  {croatianLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination City
                </label>
                <select
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select destination</option>
                  {croatianLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Point
                </label>
                <input
                  type="text"
                  value={formData.pickupPoint}
                  onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
                  placeholder="e.g., Split Harbor, Pier 5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dropoff Point
                </label>
                <input
                  type="text"
                  value={formData.dropoffPoint}
                  onChange={(e) => setFormData({ ...formData, dropoffPoint: e.target.value })}
                  placeholder="e.g., Hvar Town Marina"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Date & Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  placeholder="Select date"
                  minDate={new Date()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Boat Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Anchor className="w-5 h-5 text-blue-600" />
              Boat Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Boat Type
                </label>
                <select
                  value={formData.boatType}
                  onChange={(e) => setFormData({ ...formData, boatType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select boat type</option>
                  {boatTypes.filter((t) => t !== "All Boat Types").map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Seats Available
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.totalSeats}
                  onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
            
            {/* Quick Add Common Amenities */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {commonAmenities.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => {
                      if (!amenities.includes(amenity)) {
                        setAmenities([...amenities, amenity]);
                      }
                    }}
                    disabled={amenities.includes(amenity)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      amenities.includes(amenity)
                        ? "bg-blue-100 text-blue-700 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amenity Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
                placeholder="Add custom amenity"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addAmenity}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Selected Amenities */}
            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                  >
                    <span className="text-sm">{amenity}</span>
                    <button
                      type="button"
                      onClick={() => removeAmenity(amenity)}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Euro className="w-5 h-5 text-blue-600" />
              Price per Person
            </h2>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
              <input
                type="number"
                min="1"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Average price for similar routes: €25-45
            </p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Trip Description
            </h2>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tell passengers about your boat, experience, and what makes this trip special..."
              required
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              Publish Ride
            </button>
          </div>
        </form>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ride Published!
              </h3>
              <p className="text-gray-600">
                Your boat ride has been successfully listed. Passengers can now book your trip!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OfferRide;