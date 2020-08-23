const express = require("express");
const verify = require("../auth/verifyToken");
const router = express.Router();

const {
  getRatings,
  getRating,
  postRating,
  updateRating,
} = require("../controllers/ratings");

router.get("/:movieId", getRatings);
router.get("/check/:movieId", verify, getRating);
router.post("/", verify, postRating);
router.put("/:movieId/:userId", verify, updateRating);

module.exports = router;
