const { pool } = require("./database-config");

async function get_movie_card_data() {
  try {
    const results = await pool.query(
      "SELECT movies.id, title, slug, picture_url, avg(rating), count(rating) FROM movies INNER JOIN ratings on movies.id = ratings.movieId GROUP BY movies.id, title, slug, picture_url"
    );
    return results.rows;
  } catch (e) {
    console.error(e);
    return [];
  }
}

module.exports = {
  get_movie_card_data,
};
