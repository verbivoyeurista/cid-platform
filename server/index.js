// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ---- ROUTES MUST BE IMPORTED BEFORE app.listen ----
import stringsRoute from "./routes/strings.js";
app.use("/api/strings", stringsRoute);

// ---- BASIC HEALTH CHECK ----
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// ---- START SERVER ----
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`CID Platform server running on port ${PORT}`);
});

