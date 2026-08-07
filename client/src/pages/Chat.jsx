import { useState } from "react";
import { useParams, useNavigate } from "react-router"; // or "react-router-dom"
import { ArrowLeft, Send } from "lucide-react";
import { mockTrips } from "../data/mockData";
import { BookingTimeline } from "../components/BookingTimeline";
import { BookingStatusBanner } from "../components/BookingStatusBanner";

export default function Chat() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, senderId: "captain", text: "Hello! How can I help you?", timestamp: "10:30 AM" },
  ]);
  const [bookingStatus, setBookingStatus] = useState("pending");
  const [touristConfirmed, setTouristConfirmed] = useState(false);
  const [ownerConfirmed, setOwnerConfirmed] = useState(false);

  const trip = mockTrips.find((t) => t.id === "1");

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => navigate("/")} className="text-blue-600">Back to Home</button>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        senderId: "user",
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <button onClick={() => navigate(`/trip/${tripId}`)} className="flex items-center gap-2 text-blue-600 mb-4">
        <ArrowLeft className="w-5 h-5" /> Back to trip
      </button>

      {/* Extracted Status Timeline Component */}
      <BookingTimeline
        bookingStatus={bookingStatus}
        touristConfirmed={touristConfirmed}
        ownerConfirmed={ownerConfirmed}
      />

      {/* Main Chat Container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Messages Feed */}
        <div className="h-[400px] overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderId === "captain" ? "justify-start" : "justify-end"}`}>
              <div className={`px-4 py-2 rounded-lg text-sm max-w-md ${msg.senderId === "captain" ? "bg-gray-100" : "bg-blue-600 text-white"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Extracted Status Actions Banner */}
        <BookingStatusBanner
          bookingStatus={bookingStatus}
          touristConfirmed={touristConfirmed}
          ownerConfirmed={ownerConfirmed}
          onAccept={() => setBookingStatus("accepted")}
          onReject={() => setBookingStatus("rejected")}
          onConfirmTrip={() => {
            setTouristConfirmed(true);
            setOwnerConfirmed(true);
            setBookingStatus("completed");
          }}
          onShowReview={() => navigate("/")}
        />

        {/* Input Bar */}
        <div className="border-t border-gray-200 p-4 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleSendMessage} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}