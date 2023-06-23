import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import { passport } from "./utils/auth.utils";
import session from "express-session";

import availabilityRoutes from "./routes/availability.routes";
import meetingRoutes from "./routes/meeting.routes";
import authRoutes from "./routes/auth.routes";
import swaggerDocs from "./swagger";
import connectDB from "./utils/db.utils";
import { errorHandler } from "./middleware/error-handler.middleware";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use("/docs", swaggerDocs);

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => res.send("Welcome to the meeting app!"));
app.use("/availability", availabilityRoutes);
app.use("/meeting", meetingRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

connectDB()
  .then(() => {
    app.listen(port, (): void => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error: Error): void => {
    console.error("Server failed to start:", error);
    process.exit(1);
  });
