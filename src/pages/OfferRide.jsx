import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Calendar, Clock, Euro, Anchor, Users, Plus, X } from "lucide-react";
import { croatianLocations, boatTypes } from "../data/mockData";
import DatePicker from "../components/DatePicker";

function OfferRide() {
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ formData, amenities, selectedDate });
    navigate("/");
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const removeAmenity = (amenity) => {
    setAmenities(amenities.filter((a) => a !== amenity));
  };

  const commonAmenities = ["WiFi", "Snacks", "Drinks", "Bathroom", "Life Jackets"];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Offer a Boat Ride</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Route */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Route & Locations</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <select
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                className="border p-2 rounded"
                required
              >
                <option value="">From...</option>
                {croatianLocations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              <select
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="border p-2 rounded"
                required
              >
                <option value="">To...</option>
                {croatianLocations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Pickup Point (e.g., Split Harbor)"
                value={formData.pickupPoint}
                onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Dropoff Point (e.g., Hvar Marina)"
                value={formData.dropoffPoint}
                onChange={(e) => setFormData({ ...formData, dropoffPoint: e.target.value })}
                className="border p-2 rounded"
                required
              />
            </div>
          </div>

          {/* Boat Details */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Boat Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.boatType}
                onChange={(e) => setFormData({ ...formData, boatType: e.target.value })}
                className="border p-2 rounded"
                required
              >
                <option value="">Select boat type</option>
                {boatTypes.filter((t) => t !== "All Boat Types").map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Total Seats"
                min="1"
                max="20"
                value={formData.totalSeats}
                onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                className="border p-2 rounded"
                required
              />
            </div>
          </div>

          {/* Amenities Section */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {commonAmenities.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => !amenities.includes(amenity) && setAmenities([...amenities, amenity])}
                  className={`px-3 py-1 rounded text-sm ${
                    amenities.includes(amenity) ? "bg-blue-200 text-blue-800" : "bg-gray-200"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Custom amenity"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                className="border p-2 rounded flex-1"
              />
              <button type="button" onClick={addAmenity} className="bg-gray-800 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {amenities.map((a) => (
                <span key={a} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                  {a} <X className="w-3 h-3 cursor-pointer" onClick={() => removeAmenity(a)} />
                </span>
              ))}
            </div>
          </div>

          {/* Pricing & Basics */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price per person (€)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="border p-2 rounded w-full"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-semibold">
            Submit Ride
          </button>
        </form>
      </div>
    </div>
  );
}

export default OfferRide;