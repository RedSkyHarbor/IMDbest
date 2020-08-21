const { pool } = require("./database-config");

async function get_ratings(movieId) {
  try {
    const results = await pool.query(
      "SELECT ratings.id, ratings.movieid, ratings.userid, ratings.comment, ratings.rating, users.username FROM ratings INNER JOIN users ON ratings.userid = users.id WHERE ratings.movieid=$1;",
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

async function post_rating(movieId, userId, comment, rating) {
  try {
    const results = await pool.query(
      "INSERT INTO ratings (movieId, userId, comment, rating) VALUES ($1,$2,$3,$4) RETURNING *",
      [movieId, userId, comment, rating]
    );
    return results.rows;
  } catch (e) {
    return false;
  }
}

async function update_rating(movieId, userId, comment, rating) {
  try {
    const results = await pool.query(
      "UPDATE ratings SET comment=$1, rating=$2 WHERE movieId=$3 AND userId=$4 RETURNING *",
      [comment, rating, movieId, userId]
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
