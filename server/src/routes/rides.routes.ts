import { Request, Response, NextFunction, Router } from "express";
import { allRide, createrideItem, onerideItem } from "../db/database.js";

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

const getOnerideItem = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryResult = await onerideItem(req.params.id);

    if (queryResult.length === 0) {
      res.status(404).json({
        success: false,
        message: "ride item not found.",
      });

      return;
    }

    res.json(queryResult[0]);
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

router.get("/", getAllrides);
router.get("/:id", getOnerideItem);
router.post("/", addrideItem);

export default router;