const express = require("express");
const axios = require("axios");
const router = express.Router();

const OMDB_API_KEY = process.env.OMDb_API_KEY; // loaded from environment variables
console.log("OMDb API Key (for debugging):", OMDB_API_KEY); // <-- add this

// GET /api/movies?title=Inception
router.get("/", async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Movie title is required" });
  }

  try {
    console.log(`Fetching movie: ${title} from OMDb...`); // <-- log the title
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        t: title,
        apikey: OMDB_API_KEY
      }
    });

    console.log("OMDb response:", response.data); // <-- log full response

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
