import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ridesRouter from "./routes/rides.routes.js";
import usersRouter from "./routes/users.routes.js";
import locationsRouter from "./routes/locations.routes.js";
import bookingRouter from "./routes/bookings.routes.js";

import cors from "cors";
import session from "express-session";
import helmet from "helmet";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = Number(process.env.PORT) || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  ...(process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
    : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
/*
Source - https://stackoverflow.com/a/76119981
Posted by Jenish Mor
Retrieved 2026-08-05, License - CC BY-SA 4.0
*/
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "temporary-development-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log("Current dir: " + __dirname);
app.use(express.static(path.join(__dirname, "frontend-build")));
app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "frontend-build", "index.html"));
});

app.use(
  "/uploads",
  (_req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static("src/uploads"),
);

app.use("/bookings", bookingRouter);
app.use("/locations", locationsRouter);
app.use("/rides", ridesRouter);
app.use("/users", usersRouter);

const API_PREFIXES = ["/bookings", "/locations", "/rides", "/users", "/uploads"];
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method !== "GET") return next();
  if (API_PREFIXES.some((prefix) => req.path.startsWith(prefix))) return next();
  res.sendFile(path.join(__dirname, "frontend-build", "index.html"));
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
