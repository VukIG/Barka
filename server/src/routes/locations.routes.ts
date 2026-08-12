import { Router, Request, Response, NextFunction } from "express";
import { getAllLocations } from "../db/database.js";

const router = Router();

const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const locations = await getAllLocations();
    res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

router.get("/", getLocations);
export default router;
