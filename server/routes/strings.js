import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// from /app/routes -> up one level to /app, then into registry
const registryPath = path.join(__dirname, "../registry/contentRegistry.json");

let registry = {};
try {
  const raw = fs.readFileSync(registryPath, "utf8");
  registry = JSON.parse(raw);
  console.log("✅ Registry loaded with", Object.keys(registry));

