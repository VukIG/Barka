import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import ridesRouter from "./routes/rides.routes.js";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());   // add this BEFORE your routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express 5 and TypeScript");
});

app.use("/rides", ridesRouter);

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