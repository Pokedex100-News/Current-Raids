import express from "express";
import fetch from "node-fetch";
import path from "path";
import fs from "fs"; // Import the fs module
import { fileURLToPath } from "url";

// __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/raids/nyc", async (req, res) => {
  try {
    const response = await fetch("https://nycpokemap.com/raids.php");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch raids data" });
  }
});

app.get("/api/raids/sgp", async (req, res) => {
  try {
    const response = await fetch("https://sgpokemap.com/raids.php");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch raids data" });
  }
});

app.get("/api/raids/sydney", async (req, res) => {
  try {
    const response = await fetch("https://sydneypogomap.com/raids.php");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch raids data" });
  }
});

// Serving the pokedex data
app.get("/api/pokedex", (req, res) => {
  const pokedexPath = path.join(__dirname, "Data", "pokedexdata.json");

  fs.readFile(pokedexPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the pokedex file:", err);
      res.status(500).json({ error: "Unable to read pokedex file" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
