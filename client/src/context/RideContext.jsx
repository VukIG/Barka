import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { API_URL } from "../config/api";

const RideContext = createContext(undefined);

export function RideProvider({ children }) {
  const { id } = useParams();
  const [rideData, setRideData] = useState();

  const refresh = useCallback(() => {
    fetch(`${API_URL}/rides/${id}`)
      .then((response) => response.json())
      .then((data) => setRideData(data))
      .catch((err) => console.log("Error loading rides:", err));
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const ride = rideData?.ride;
  const reviews = rideData?.reviews ?? [];

  return (
    <RideContext.Provider value={{ id, rideData, ride, reviews, refresh }}>
      {children}
    </RideContext.Provider>
  );
}

export function useRide() {
  const ctx = useContext(RideContext);
  if (ctx === undefined) {
    throw new Error("useRide must be used within a RideProvider");
  }
  return ctx;
}
