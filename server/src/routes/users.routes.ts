import { Request, Response, NextFunction, Router } from "express";
import { authUser, createUser, getUserProfile } from "../db/database.js";
import { requireLogin } from "../middleware/require-login.js";
const router = Router();

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
      return;
    }

    const queryResult = await authUser(email);

    if (queryResult.length === 0) {
      res.status(401).json({
        success: false,
        message: "User is not registered.",
      });
      return;
    }

    const user = queryResult[0];

    if (password !== user.password) {
      res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
      return;
    }

    req.session.user = {
      id: user.id,
      username: user.user_name,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user.id,
        username: user.user_name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      username,
      firstName,
      lastName,
      age,
      gender,
      nationality,
      role,
      email,
      password,
    } = req.body as {
      username?: string;
      firstName?: string;
      lastName?: string;
      age?: string;
      gender?: string;
      nationality?: string;
      role?: string;
      email?: string;
      password?: string;
    };

    if (
      !username ||
      !firstName ||
      !lastName ||
      !age ||
      !nationality ||
      !role ||
      !email ||
      !password
    ) {
      res.status(400).json({
        success: false,
        message: "All fields except gender are required.",
      });
      return;
    }

    const queryResult = await createUser(
      username,
      firstName,
      lastName,
      Number(age),
      gender ?? null,
      nationality,
      role,
      email,
      password,
    );

    if (queryResult.affectedRows !== 1) {
      res.status(500).json({
        success: false,
        message: "User was not registered.",
      });
      return;
    }

    req.session.user = {
      id: queryResult.insertId,
      username: username,
      email: email,
    };

    res.status(201).json({
      success: true,
      message: "Sign up successful.",
      user: {
        id: queryResult.insertId,
        username: username,
        email: email,
      },
    });
  } catch (error) {
    next(error);
  }
};
const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
      return;
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ success: true, message: "Logout successful." });
  });
};

const getCurrentUser = async (req: Request, res: Response) => {
  if (!req.session.user) {
    res.status(200).json({
      loggedIn: false,
      user: null,
    });
    return;
  }

  const userId = req.session.user.id;
  const queryResult = await getUserProfile(userId);
  res.status(200).json(queryResult);
};

router.get("/me", requireLogin, getCurrentUser);
router.post("/logout", requireLogin, logoutUser);
router.post("/logIn", loginUser);
router.post("/signUp", signUpUser);

export default router;
