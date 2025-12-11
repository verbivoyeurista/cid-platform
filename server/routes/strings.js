import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// ES module __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// From /app/routes -> up one level to /app, then into /registry
const registryPath = path.join(__dirname, "../registry/contentRegistry.json");

// Load registry JSON once at startup
let registry = {};
try {
  const raw = fs.readFileSync(registryPath, "utf8");
  registry = JSON.parse(raw);
  console.log("✅ Registry loaded with", Object.keys(registry).length, "entries");
} catch (err) {
  console.error("❌ Failed to load contentRegistry.json:", err);
}

// GET /strings/  -> full registry
router.get("/", (req, res) => {
  res.json(registry);
});

// GET /strings/:key  -> single value
router.get("/:key", (req, res) => {
  const key = req.params.key;
  const value = registry[key] ?? null;
  res.json({ key, value, found: value !== null && value !== undefined });
});

export default router;
