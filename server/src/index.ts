import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import ridesRouter from "./routes/rides.routes.js";
import usersRouter from "./routes/users.routes.js";
import cors from "cors";
import session from "express-session";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));
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
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express 5 and TypeScript");
});

app.use("/rides", ridesRouter);
app.use("/users", usersRouter);

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