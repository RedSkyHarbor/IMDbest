const { pool } = require("./database-config");

async function get_ratings(movieId) {
  try {
    const results = await pool.query(
      "SELECT ratings.*, users.username FROM ratings INNER JOIN users ON ratings.userid = users.id WHERE ratings.movieid=$1 ORDER BY created_at DESC;",
      [movieId]
    );
    return results.rows;
  } catch (e) {
    return [];
  }
}

async function get_rating(movieId, userId) {
  try {
    const results = await pool.query(
      "SELECT * FROM ratings WHERE movieId=$1 AND userId=$2",
      [movieId, userId]
    );
    return results.rows;
  } catch (e) {
    return [];
  }
}

async function post_rating(movieId, userId, headline, comment, rating) {
  try {
    const results = await pool.query(
      "INSERT INTO ratings (movieId, userId, headline, comment, rating) VALUES ($1,$2,$3,$4, $5) RETURNING *",
      [movieId, userId, headline, comment, rating]
    );
    return results.rows;
  } catch (e) {
    return false;
  }
}

async function update_rating(movieId, userId, headline, comment, rating) {
  try {
    const results = await pool.query(
      "UPDATE ratings SET comment=$1, rating=$2, headline=$3, was_updated=True WHERE movieId=$4 AND userId=$5 RETURNING *",
      [comment, rating, headline, movieId, userId]
    );
    return results.rows;
  } catch (e) {
    return false;
  }
}

module.exports = {
  get_ratings,
  get_rating,
  post_rating,
  update_rating,
};
