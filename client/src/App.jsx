import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import OfferRide from "./pages/OfferRide";
import Profile from "./pages/Profile";
import AuthPage from "./pages/AuthPage";
import BuissnesDashboard from "./pages/BuissnessDashboard";
import Layout from "./components/Layout";
import RideDetails from "./pages/RideDetails";
import Chat from "./pages/Chat";
import { AuthProvider } from "./context/AuthContext";

export default function   App() {
  return (
    <AuthProvider >
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<AuthPage />} />
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="rides/:id" element={<RideDetails />} />
            <Route path="offer" element={<OfferRide />} />
            <Route path="buissnes" element={<BuissnesDashboard />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="chat/:rideId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}
