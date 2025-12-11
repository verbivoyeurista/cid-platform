import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Required for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to registry JSON **inside the app**
const registryPath = path.join(__dirname, "../../registry/contentRegistry.json");

let registry = {};
try {
  const raw = fs.readFileSync(registryPath, "utf8");
  registry = JSON.parse(raw);
  console.log("✅ Registry loaded with", Object.keys(registry).length, "entries");
} catch (err) {
  console.error("❌ Failed to load contentRegistry.json:", err);
}

// Return full registry
router.get("/", (req, res) => {
  res.json(registry);
});

// Return single key
router.get("/:key", (req, res) => {
  const key = req.params.key;
  const value = registry[key] || null;
  res.json({ key, value, found: Boolean(value) });
});

export default router;
