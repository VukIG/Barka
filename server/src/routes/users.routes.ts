import { Request, Response, NextFunction, Router } from "express";
import { authUser, createUser, getUserProfile } from "../db/database.js";
import { requireLogin } from "../middleware/require-login.js";
import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "src/uploads/users");
  },
  filename: (_req, file, callback) => {
    const uniquePrefix = Date.now();
    const safeOriginalName = file.originalname.replaceAll(" ", "-");

    callback(null, `${uniquePrefix}-${safeOriginalName}`);
  },
});

const upload = multer({ storage });


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
      description
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
      description?: string;
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

      const imagePath = req.file
          ? path.posix.join("uploads", "users", req.file.filename)
          : null;
    

    const queryResult = await createUser(
      imagePath,
      username,
      firstName,
      lastName,
      Number(age),
      gender ?? null,
      nationality,
      role,
      email,
      password,
      description
    );

    if (queryResult === null) {
      res.status(409).json({
        success: false,
        message: "Username or email already exists.",
      });
      return;
    }

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
router.post("/logIn",upload.none(), loginUser);
router.post("/signUp",  upload.single("image"), signUpUser);

export default router;
