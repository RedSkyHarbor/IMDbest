const { pool } = require('./database-config');

async function post_rating(movieId, userId, comment, rating) {
    try {
        const results = await pool.query('INSERT INTO ratings (movieId, userId, comment, rating) VALUES ($1,$2,$3,$4) RETURNING *', [movieId, userId, comment, rating]);
        return results.rows;
    } catch (e) {
        return false;
    }
}

module.exports = {
    post_rating
}