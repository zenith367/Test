const { admin } = require("../services/firebaseAdmin");

exports.verifyToken = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    res.json({ uid: decoded.uid });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error });
  }
};
