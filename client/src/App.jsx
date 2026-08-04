import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import TripDetails from "./pages/TripDetails";
import OfferRide from "./pages/OfferRide";
import Profile from "./pages/Profile";
import AuthPage from "./pages/AuthPage"
import BuissnesDashboard from "./pages/BuissnessDashboard";
import Layout from "./components/Layout";
export default function App() {
  return (
    <BrowserRouter>
      <Routes >
         <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="trip/:id" element={<TripDetails />} />
          <Route path="offer" element={<OfferRide />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="buissnes" element={<BuissnesDashboard />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}