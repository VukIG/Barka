import { createBooking, getRideBookings, acceptBooking, rejectBooking } from "../db/database.js";
import { Request, Response, NextFunction, Router } from "express";
import { requireLogin } from "../middleware/require-login.js";

const router = Router();

const addBooking = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const touristId = req.session.user!.id
    const { rideId, numberOfTickets, cost } = req.body as {
      rideId: string,
      numberOfTickets: number,
      cost: number,
    }
    const result  = await createBooking(rideId, touristId, numberOfTickets, cost)
    if (result .affectedRows === 0){
      res.status(500).json({success: false, message: "The booking was not created."})
      return;
  }
    res.status(200).json({success: true, message: "Booking was created successfully!"})
  } catch (error) {
    next(error)
  }
}

const getBookingsForRide = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ownerId = req.session.user!.id;
    const bookings = await getRideBookings(req.params.id, ownerId);
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const acceptBookingRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ownerId = req.session.user!.id;
    const result = await acceptBooking(req.params.bookingId, ownerId);

    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ success: false, message: "Booking not found or not yours." });
      return;
    }

    res.status(200).json({ success: true, message: "Booking accepted." });
  } catch (error) {
    next(error);
  }
};

const rejectBookingRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ownerId = req.session.user!.id;
    const result = await rejectBooking(req.params.bookingId, ownerId);

    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ success: false, message: "Booking not found or not yours." });
      return;
    }

    res.status(200).json({ success: true, message: "Booking rejected." });
  } catch (error) {
    next(error);
  }
};

router.post("/createBooking", requireLogin, addBooking)
router.get("/:id/bookings", requireLogin, getBookingsForRide);
router.post("/bookings/:bookingId/accept", requireLogin, acceptBookingRequest);
router.post("/bookings/:bookingId/reject", requireLogin, rejectBookingRequest);

export default router;