const { pool } = require('./database-config');

async function get_movies() {
    try {
        // TODO this query is undounded
        const results = await pool.query('SELECT * FROM movies');
        return results.rows;
    } catch (e) {
        // TODO more specific error response
        return [];
    }
}

async function get_movie(movieId) {
    try {
        const results = await pool.query('SELECT * FROM movies WHERE id=$1', [movieId]);
        return results.rows;
    } catch (e) {
        // TODO more specific error response "Movie with this id not found"
        return [];
    }
}

async function search_movie(partialTitle) {
    console.log(partialTitle);
    try {
        const results = await pool.query('SELECT * FROM movies WHERE title ILIKE $1', ['%' + partialTitle + '%']);
        return results.rows;
    } catch (e) {
        console.log(e);
        // TODO more specific error response
        return [];
    }
}

async function create_movie(title, slug, genres, release_date, length, fcc_rating, picture_url, summary) {
    try {
        const results = await pool.query('INSERT INTO movies (title, slug, genres, release_date, length, fcc_rating, picture_url, summary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [title, slug, genres, release_date, length, fcc_rating, picture_url, summary]);
        return results.rows;
    } catch (e) {
        console.log(`create_movie error: ${e}, error code: ${e.code}`);
        if (e.code === '23505') {
            return `A movie with the title ${title} already exists`;
        }
        return false;
    }
}

module.exports = {
    get_movies,
    get_movie,
    search_movie,
    create_movie
};