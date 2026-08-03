import { Request, Response, NextFunction, Router } from "express";
import { allRide, createrideItem, filteredRides } from "../db/database.js";

const router = Router();

const getAllrides = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryResult = await allRide();

    res.json(queryResult);
  } catch (error) {
    next(error);
  }
};

const addrideItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, slug, text } = req.body as {
      title?: string;
      slug?: string;
      text?: string;
    };

    if (!title || !slug || !text) {
      res.status(400).json({
        success: false,
        message: "Title, slug and text are required.",
      });

      return;
    }

    const queryResult = await createrideItem(title, slug, text);

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