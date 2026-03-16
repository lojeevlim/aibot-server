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
app.use(cors({
  origin: "*",
  credentials: false,
}));

app.use(express.json());

// Health check route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/chat", chatRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Only listen locally, not on Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on ${URL}:${PORT}`);
  });
}

export default app;