const { db } = require("../services/firebaseAdmin");

const addReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;
    const userId = req.user.uid;

    const newReview = {
      userId,
      movieId,
      rating,
      comment,
      createdAt: new Date(),
    };

    const ref = await db.collection("reviews").add(newReview);
    res.status(201).json({ id: ref.id, ...newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const snapshot = await db.collection("reviews").get();
    const reviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    await db.collection("reviews").doc(id).update({ rating, comment });
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("reviews").doc(id).delete();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addReview, getReviews, updateReview, deleteReview };
