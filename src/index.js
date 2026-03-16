import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "http://localhost";

// Middleware
app.use(
  cors({
    origin: URL,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${URL}:${PORT}`);
});