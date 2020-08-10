const { pool } = require('./database-config');

async function get_movie_card_data() {
    try {
        const results = await pool.query('SELECT title, picture_url, avg(rating) FROM movies INNER JOIN ratings on movies.id = ratings.movieId GROUP BY title, picture_url');
        return results.rows;
    } catch (e) {
        return [];
    }
}

module.exports = {
    get_movie_card_data
}