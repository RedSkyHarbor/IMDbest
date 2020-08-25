const { pool } = require("./database-config");

async function get_movies() {
  try {
    // TODO this query is undounded, at some point add pagination
    const results = await pool.query("SELECT * FROM movies");
    return results.rows;
  } catch (e) {
    return [];
  }
}

async function get_movie(movieId) {
  try {
    const results = await pool.query(
      "SELECT movies.*, avg(rating), count(rating) FROM movies INNER JOIN ratings ON movies.id = ratings.movieId WHERE movies.id=$1 GROUP BY movies.id;",
      [movieId]
    );
    return results.rows;
  } catch (e) {
    return [];
  }
}

async function search_movie(partialTitle, order) {
  try {
    let results;
    if (order == "asc") {
      results = await pool.query(
        "SELECT movies.*, avg(rating), count(rating) FROM movies INNER JOIN ratings on movies.id = ratings.movieId WHERE title ILIKE $1 GROUP BY movies.id ORDER BY avg(rating) ASC",
        ["%" + partialTitle + "%"]
      );
    } else if (order == "desc") {
      results = await pool.query(
        "SELECT movies.*, avg(rating), count(rating) FROM movies INNER JOIN ratings on movies.id = ratings.movieId WHERE title ILIKE $1 GROUP BY movies.id ORDER BY avg(rating) DESC",
        ["%" + partialTitle + "%"]
      );
    }
    return results.rows;
  } catch (e) {
    return [];
  }
}

async function create_movie(
  title,
  slug,
  genres,
  release_date,
  length,
  fcc_rating,
  picture_url,
  summary
) {
  try {
    const results = await pool.query(
      "INSERT INTO movies (title, slug, genres, release_date, length, fcc_rating, picture_url, summary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        title,
        slug,
        genres,
        release_date,
        length,
        fcc_rating,
        picture_url,
        summary,
      ]
    );
    return results.rows;
  } catch (e) {
    if (e.code === "23505") {
      return `A movie with the title ${title} already exists`;
    }
    return false;
  }
}

module.exports = {
  get_movies,
  get_movie,
  search_movie,
  create_movie,
};
