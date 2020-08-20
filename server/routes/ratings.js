const express = require("express");
const router = express.Router();
const {
  getRatings,
  getRating,
  postRating,
  updateRating,
} = require("../controllers/ratings");

router.get("/:movieId", getRatings);
router.get("/:movieId/:userId", getRating);
router.post("/", postRating);
router.put("/:movieId/:userId", updateRating);

module.exports = router;
