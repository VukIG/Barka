import { Radar, Sparkles, Flame, ShieldCheck } from "lucide-react";

export const nationalities = [
  { code: "HR", name: "Croatia" },
  { code: "SI", name: "Slovenia" },
  { code: "ME", name: "Montenegro" },
  { code: "IT", name: "Italy" },
  { code: "DE", name: "Germany" },
  { code: "AT", name: "Austria" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "US", name: "United States" },
];

export const EMPTY_FORM = {
  name: "",
  firstname: "",
  lastname: "",
  age: "",
  gender: "",
  nationality: "",
  role: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const croatianLocations = [
  "Dubrovnik",
  "Split",
  "Zadar",
  "Rijeka",
  "Pula",
  "Rovinj",
  "Hvar",
  "Korčula",
  "Brač",
  "Vis",
  "Šibenik",
  "Trogir",
  "Makarska",
  "Cavtat",
  "Omiš",
];

export const mockUsers = [
  {
    id: "1",
    name: "Marko Kovačić",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    memberSince: "2023",
  },
  {
    id: "2",
    name: "Ana Horvat",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4.8,
    reviewCount: 89,
    verified: true,
    memberSince: "2024",
  },
  {
    id: "3",
    name: "Ivan Petrović",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 4.7,
    reviewCount: 56,
    verified: true,
    memberSince: "2024",
  },
  {
    id: "4",
    name: "Petra Novak",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5.0,
    reviewCount: 142,
    verified: true,
    memberSince: "2022",
  },
];

export const mockTrips = [
  {
    id: "1",
    captain: mockUsers[0],
    from: "Split",
    to: "Hvar",
    date: "2026-04-05",
    time: "09:00",
    price: 35,
    seatsAvailable: 3,
    totalSeats: 6,
    boatType: "Speedboat",
    duration: "1h 30m",
    amenities: ["WiFi", "Snacks", "Life Jackets", "Waterproof Storage"],
    description:
      "Regular route from Split to Hvar. Comfortable speedboat with plenty of space. I've been doing this route for 3 years, know all the best spots!",
    pickupPoint: "Split Harbor, Pier 5",
    dropoffPoint: "Hvar Town Marina",
  },
  {
    id: "2",
    captain: mockUsers[1],
    from: "Dubrovnik",
    to: "Korčula",
    date: "2026-04-05",
    time: "10:30",
    price: 45,
    seatsAvailable: 2,
    totalSeats: 4,
    boatType: "Yacht",
    duration: "2h 15m",
    amenities: ["WiFi", "Drinks", "Snacks", "Bathroom", "Sundeck"],
    description:
      "Luxury yacht transfer to Korčula. Enjoy the scenic route along the coast with refreshments included.",
    pickupPoint: "Dubrovnik Old Port",
    dropoffPoint: "Korčula Marina",
  },
  {
    id: "3",
    captain: mockUsers[2],
    from: "Zadar",
    to: "Pag",
    date: "2026-04-06",
    time: "14:00",
    price: 25,
    seatsAvailable: 5,
    totalSeats: 8,
    boatType: "Passenger Boat",
    duration: "1h 00m",
    amenities: ["Life Jackets", "Seating Area", "Shade"],
    description:
      "Daily route to Pag island. Reliable and affordable transportation.",
    pickupPoint: "Zadar Ferry Terminal",
    dropoffPoint: "Pag Town Harbor",
  },
  {
    id: "4",
    captain: mockUsers[3],
    from: "Rovinj",
    to: "Pula",
    date: "2026-04-06",
    time: "11:00",
    price: 30,
    seatsAvailable: 4,
    totalSeats: 6,
    boatType: "Speedboat",
    duration: "45m",
    amenities: ["WiFi", "Music", "Life Jackets", "Cooler"],
    description:
      "Fast and comfortable ride along the Istrian coast. Perfect for day trips!",
    pickupPoint: "Rovinj Marina",
    dropoffPoint: "Pula City Harbor",
  },
  {
    id: "5",
    captain: mockUsers[0],
    from: "Split",
    to: "Brač",
    date: "2026-04-07",
    time: "08:30",
    price: 28,
    seatsAvailable: 6,
    totalSeats: 8,
    boatType: "Passenger Boat",
    duration: "50m",
    amenities: ["Life Jackets", "Seating Area", "Storage"],
    description:
      "Morning boat to beautiful Brač island. Great for beach lovers heading to Zlatni Rat!",
    pickupPoint: "Split Harbor, Pier 3",
    dropoffPoint: "Supetar Port, Brač",
  },
  {
    id: "6",
    captain: mockUsers[1],
    from: "Dubrovnik",
    to: "Cavtat",
    date: "2026-04-07",
    time: "16:00",
    price: 20,
    seatsAvailable: 3,
    totalSeats: 6,
    boatType: "Speedboat",
    duration: "30m",
    amenities: ["WiFi", "Drinks", "Life Jackets"],
    description:
      "Quick evening ride to beautiful Cavtat. Perfect for sunset views!",
    pickupPoint: "Dubrovnik Old Port",
    dropoffPoint: "Cavtat Harbor",
  },
];

export const boatTypes = [
  "All Boat Types",
  "Motorboat",
  "Yacht",
  "Passenger Boat",
  "Catamaran",
  "Sailboat",
];

export const reviews = [
  {
    id: "1",
    userId: "2",
    userName: "Ana Horvat",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "Fantastic trip! Marko was very professional and the boat was clean and comfortable.",
    date: "2026-03-15",
    route: "Split → Hvar",
  },
  {
    id: "2",
    userId: "3",
    userName: "Ivan Petrović",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "Great captain, arrived on time and made the journey very enjoyable!",
    date: "2026-03-10",
    route: "Split → Hvar",
  },
  {
    id: "3",
    userId: "4",
    userName: "Petra Novak",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4,
    comment: "Smooth ride, would definitely book again.",
    date: "2026-03-05",
    route: "Split → Brač",
  },
];

// Real decimal-degree coordinates. Add/move a port here — the map re-projects automatically.
export const traffic = [
  {
    name: "Koper",
    longitude: 13.73,
    latitude: 45.55,
    traffic: "Srednji",
    boats: 8,
    color: "#53d8fb",
  },
  {
    name: "Pula",
    longitude: 13.85,
    latitude: 44.87,
    traffic: "Srednji",
    boats: 14,
    color: "#53d8fb",
  },
  {
    name: "Rijeka",
    longitude: 14.44,
    latitude: 45.33,
    traffic: "Visok",
    boats: 22,
    color: "#ffbf69",
  },
  {
    name: "Zadar",
    longitude: 15.23,
    latitude: 44.12,
    traffic: "Visok",
    boats: 19,
    color: "#ffbf69",
  },
  {
    name: "Šibenik",
    longitude: 15.9,
    latitude: 43.73,
    traffic: "Srednji",
    boats: 11,
    color: "#53d8fb",
  },
  {
    name: "Split",
    longitude: 16.44,
    latitude: 43.51,
    traffic: "Visok",
    boats: 39,
    color: "#ffbf69",
  },
  {
    name: "Hvar",
    longitude: 16.44,
    latitude: 43.17,
    traffic: "Vrhunac",
    boats: 31,
    color: "#ff735c",
  },
  {
    name: "Korčula",
    longitude: 17.13,
    latitude: 42.96,
    traffic: "Visok",
    boats: 24,
    color: "#ffbf69",
  },
  {
    name: "Dubrovnik",
    longitude: 18.09,
    latitude: 42.65,
    traffic: "Visok",
    boats: 17,
    color: "#ffbf69",
  },
  {
    name: "Kotor",
    longitude: 18.77,
    latitude: 42.42,
    traffic: "Srednji",
    boats: 9,
    color: "#53d8fb",
  },
];

export const eastAdriaticRoutes = [
  { id: "koper-rijeka", from: "Koper", to: "Rijeka", intensity: "low" },
  { id: "pula-zadar", from: "Pula", to: "Zadar", intensity: "medium" },
  { id: "rijeka-zadar", from: "Rijeka", to: "Zadar", intensity: "medium" },
  { id: "zadar-sibenik", from: "Zadar", to: "Šibenik", intensity: "medium" },
  { id: "sibenik-split", from: "Šibenik", to: "Split", intensity: "medium" },
  { id: "split-hvar", from: "Split", to: "Hvar", intensity: "high" },
  { id: "split-korcula", from: "Split", to: "Korčula", intensity: "high" },
  { id: "hvar-korcula", from: "Hvar", to: "Korčula", intensity: "high" },
  {
    id: "korcula-dubrovnik",
    from: "Korčula",
    to: "Dubrovnik",
    intensity: "medium",
  },
  { id: "dubrovnik-kotor", from: "Dubrovnik", to: "Kotor", intensity: "low" },
];

export const fleet = [
  {
    name: "Jadran 7",
    type: "Speedboat",
    route: "Split → Hvar",
    state: "Na ruti",
    eta: "12 min",
    tone: "bg-[#bff2ed] text-[#0d5a5b]",
  },
  {
    name: "Mare Blu",
    type: "Katamaran",
    route: "Trogir → Brač",
    state: "Ukrcaj",
    eta: "27 min",
    tone: "bg-[#fff0be] text-[#72510b]",
  },
  {
    name: "Val 04",
    type: "Gliser",
    route: "Hvar → Korčula",
    state: "Na ruti",
    eta: "41 min",
    tone: "bg-[#bff2ed] text-[#0d5a5b]",
  },
];

export const demandByRange = {
  Danas: [
    { time: "07h", actual: 38, forecast: 34 },
    { time: "09h", actual: 71, forecast: 62 },
    { time: "11h", actual: 138, forecast: 120 },
    { time: "13h", actual: 164, forecast: 158 },
    { time: "15h", actual: 152, forecast: 169 },
    { time: "17h", actual: 186, forecast: 194 },
    { time: "19h", actual: 128, forecast: 148 },
    { time: "21h", actual: 72, forecast: 76 },
  ],
  "7 dana": [
    { time: "Pon", actual: 740, forecast: 710 },
    { time: "Uto", actual: 882, forecast: 830 },
    { time: "Sri", actual: 1041, forecast: 1010 },
    { time: "Čet", actual: 1198, forecast: 1160 },
    { time: "Pet", actual: 1310, forecast: 1360 },
    { time: "Sub", actual: 1540, forecast: 1570 },
    { time: "Ned", actual: 1280, forecast: 1300 },
  ],
  "30 dana": [
    { time: "1. tjedan", actual: 5400, forecast: 5100 },
    { time: "2. tjedan", actual: 7120, forecast: 6900 },
    { time: "3. tjedan", actual: 8760, forecast: 8500 },
    { time: "4. tjedan", actual: 9840, forecast: 10100 },
  ],
};

export const arrivals = [
  { place: "Dubrovnik", value: 91, guests: "15.1k", spend: 58 },
  { place: "Split", value: 84, guests: "12.4k", spend: 46 },
  { place: "Hvar", value: 72, guests: "8.9k", spend: 61 },
  { place: "Korčula", value: 46, guests: "4.3k", spend: 39 },
  { place: "Vis", value: 33, guests: "2.8k", spend: 44 },
];

// Brand names that scroll across the "Trusted by" strip.
const PARTNERS = [
  "OŽUJSKO",
  "VALAMAR",
  "CROATIA AIRLINES",
  "MAISTRA",
  "HRVATSKI TELEKOM",
  "JAMNICA",
  "MASTERCARD",
  "UBER",
];

// Words that cycle in the big hero headline (Teads-style).
export const HERO_WORDS = ["Signals", "Predictions", "Reach", "Results"];

// English labels for the chart range buttons. The KEYS ("Danas", "Tjedan")
// must stay the same because they come from the demandByRange data object.
export const RANGE_LABELS = { Danas: "Today", Tjedan: "Week" };

// English labels for the traffic level, which comes from mockData.
export const TRAFFIC_LABELS = {
  Nizak: "low",
  Srednji: "moderate",
  Visok: "high",
  Vrhunac: "peak",
};

// The four things a company actually buys ("what you get").
export const PILLARS = [
  {
    icon: Radar,
    title: "Live traffic signals",
    text: "Arrivals, routes, and port occupancy in real time, straight from boat traffic.",
  },
  {
    icon: Sparkles,
    title: "Predictive model",
    text: "ML predicts not just how many tourists arrive, but what type they are and where they go.",
  },
  {
    icon: Flame,
    title: "Demand heatmaps",
    text: "See where the coast is filling up and plan campaigns by exact location.",
  },
  {
    icon: ShieldCheck,
    title: "GDPR-safe data",
    text: "Anonymized and aggregated, hosted in the EEA, ready for partners.",
  },
];

// Dark tooltip used by both charts so they match the theme.
export const darkTooltip = {
  backgroundColor: "#0c2834",
  borderColor: "#278c91",
  color: "#fff",
  borderRadius: "8px",
};
