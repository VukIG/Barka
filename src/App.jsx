import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import TripDetails from "./pages/TripDetails";
import OfferRide from "./pages/OfferRide";
import Profile from "./pages/Profile";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="trip/:id" element={<TripDetails />} />
          <Route path="offer" element={<OfferRide />} />
          <Route path="profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}