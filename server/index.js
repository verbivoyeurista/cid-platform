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

// ---- BASIC ROOT + HEALTH CHECK ----
app.get("/", (req, res) => {
  res.json({ ok: true, message: "CID Platform backend is running" });
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// ---- START SERVER ----
// Railway injects PORT; default to 8080 for local dev
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CID Platform server running on port ${PORT}`);
});
