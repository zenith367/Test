const express = require("express");
const axios = require("axios");
const router = express.Router();

const OMDB_API_KEY = process.env.OMDB_API_KEY; // loaded from .env

// GET /api/movies?title=Inception
router.get("/", async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Movie title is required" });
  }

  try {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        t: title,
        apikey: OMDB_API_KEY
      }
    });

    if (response.data.Response === "False") {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching movie from OMDb:", error.message);
    res.status(500).json({ error: "Failed to fetch movie data" });
  }
});

module.exports = router;
