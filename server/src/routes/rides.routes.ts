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
      dropoffPoint,
      from,
      pickupPoint,
      price,
      time,
      to,
      totalSeats
    } = req.body as {
      boatType: string;
      description: string;
      dropoffPoint: string;
      from: string;
      pickupPoint: string;
      price: string;
      time: string;
      to: string;
      totalSeats: string;
    };

    if (!pickupPoint || !dropoffPoint || !price || !time || !to) {
      res.status(400).json({ success: false, message: "Missing required ride fields." });
      return;
    }

    const queryResult = await createRideItem(
      42,                 
      1,                   
      pickupPoint,         
      dropoffPoint,        
      price,     
      time,         
      to,                
      description,
      Number(totalSeats) 
    ); 

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "ride item added.",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "ride item was not added.",
    });
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
router.post("/", addrideItem);

export default router;