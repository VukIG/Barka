import { Request, Response, NextFunction, Router } from "express";
import { createRideItem, filteredRides } from "../db/database.js";

const router = Router();

const addrideItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      boatType,
      description,
      from,
      to,
      price,
      departureTime,
      arrivalTime,
    } = req.body as {
      boatType: string;
      description: string;
      from: string;
      to: string;
      price: string;
      departureTime: string;
      arrivalTime: string;
    };

    if (!from || !to || !price || !departureTime || !arrivalTime) {
      res.status(400).json({ success: false, message: "Missing required ride fields." });
      return;
    }

    const DATETIME = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!DATETIME.test(departureTime) || !DATETIME.test(arrivalTime)) {
      res.status(400).json({
        success: false,
        message: "departureTime and arrivalTime must be 'YYYY-MM-DD HH:MM:SS'.",
      });
      return;
    }

    const queryResult = await createRideItem(
      42,             // ownerId (dummy for now)
      1,              // boatId  (dummy for now)
      from,           // -> start_port_id 
      to,             // -> end_port_id
      price,          // -> ticket_cost
      departureTime,  // -> departure -> `date`
      arrivalTime,    // -> arrival   -> expected_arrival
      description,
    );

    if (queryResult.affectedRows === 1) {
      res.status(201).json({ success: true, message: "ride item added." });
      return;
    }

    res.status(500).json({ success: false, message: "ride item was not added." });
  } catch (error) {
    next(error);
  }
};

const getFilteredRides = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const from = req.query.from as string;
    const to = req.query.to as string;
    const date = req.query.date as string;
    const queryResult = await filteredRides(from, to, date);
    res.json(queryResult);
  } catch (error) {
    next(error);
  }
};


router.get("/search", getFilteredRides);
router.post("/add", addrideItem);

export default router;