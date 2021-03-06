const { Validator } = require("node-input-validator");
const {
  get_ratings,
  get_rating,
  post_rating,
  update_rating,
} = require("../services/ratings");

/* get all ratings for a particular movie */
const getRatings = async (req, res) => {
  const { movieId } = req.params;
  const rows = await get_ratings(parseInt(movieId));
  res.header("content-type", "application/json");
  res.send(JSON.stringify(rows));
};

/* get a rating for a particular movie from a particular user */
const getRating = async (req, res) => {
  const { movieId } = req.params;
  const { userId } = req.body;
  const rows = await get_rating(parseInt(movieId), parseInt(userId));
  res.header("content-type", "application/json");
  res.send(JSON.stringify(rows));
};

/* create a new rating for a movie */
const postRating = async (req, res) => {
  const validator = new Validator(req.body, {
    movieId: "required|integer",
    userId: "required|integer",
    comment: "required|string|minLength:3|maxLength:2055",
    rating: "required|decimal",
    headline: "required|string|minLength:3|maxLength:64",
  });

  const matched = await validator.check();

  if (!matched) {
    return res.status(422).send(validator.errors);
  }

  if (req.body.rating < 0 || req.body.rating > 10) {
    return res
      .status(422)
      .send(JSON.stringify("Rating must be between 0 and 10."));
  }

  let result = {};
  try {
    const { movieId, userId, headline, comment, rating } = req.body;
    result.response = await post_rating(
      movieId,
      userId,
      headline,
      comment,
      rating
    );
    res.status(200);
  } catch (e) {
    res.status(400);
    result.response = false;
  } finally {
    res.header("content-type", "application/json");
    return res.send(JSON.stringify(result));
  }
};

const updateRating = async (req, res) => {
  const { movieId } = req.params;
  const { userId } = req.body;

  const validator = new Validator(req.body, {
    comment: "required|string|minLength:3|maxLength:2055",
    headline: "required|string|minLength:3|maxLength:64",
    rating: "required|decimal",
    userId: "required|decimal",
  });

  const matched = await validator.check();

  if (!matched) {
    res.status(422).send(validator.errors);
    return;
  }

  if (req.body.rating < 0 || req.body.rating > 10) {
    res.status(422).send("Rating must be between 0 and 10.");
    return;
  }

  let result = {};
  try {
    const { comment, rating, headline } = req.body;
    result.response = await update_rating(
      movieId,
      userId,
      headline,
      comment,
      rating
    );
  } catch (e) {
    result.response = false;
    res.status(400);
  } finally {
    res.header("content-type", "application/json");
    res.send(JSON.stringify(result));
  }
};

module.exports = {
  getRatings,
  getRating,
  postRating,
  updateRating,
};
