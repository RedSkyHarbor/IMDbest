const express = require("express");
const router = express.Router();
const { getMovieCardData } = require("../controllers/index");

router.get("/", getMovieCardData);

module.exports = router;
