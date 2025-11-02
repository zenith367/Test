require("dotenv").config();
const express = require("express");
const cors = require("cors");

const reviewRoutes = require("./routes/reviews");
const movieRoutes = require("./routes/movies"); // ← add this

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reviews", reviewRoutes);
app.use("/api/movies", movieRoutes); // ← add this

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
