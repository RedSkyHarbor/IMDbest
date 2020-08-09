const { pool } = require('../server-config');

async function get_movies() {
    try {
        // TODO this query is undounded
        const results = await pool.query('SELECT * FROM movies');
        return results.rows;
    } catch (e) {
        return [];
    }
}

async function get_movie(movieId) {
    try {
        const results = await pool.query('SELECT * FROM movies WHERE id=$1', [movieId]);
        return results.rows;
    } catch (e) {
        return [];
    }
}

async function create_movie(movieData) {
    let { title, slug, genres, release_date, length, fcc_rating, picture_url, summary } = movieData;
    try {
        await pool.query('INSERT INTO movies (title, slug, genres, release_date, length, fcc_rating, picture_url, summary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [title, slug, genres, release_date, length, fcc_rating, picture_url, summary]);
        // TODO return the object that was inserted
        return true;
    } catch (e) {
        // TODO If insert fails tell user WHY. Is a movie with this title already in the DB?
        return false;
    }
}

module.exports = {
    get_movies,
    get_movie,
    create_movie
};