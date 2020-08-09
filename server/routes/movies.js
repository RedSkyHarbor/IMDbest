const express = require('express');
const router = express.Router();
const { pool } = require('../server-config');


router.get('/', async (req, res) => {
    const rows = await get_movies();
    res.header('content-type', 'application/json');
    res.send(JSON.stringify(rows));
});

router.get('/:id', async (req, res) => {
    // TODO if row empty return status 404 and send `A movie with the id:${movieId} was not found`
    row = await get_movie(parseInt(req.params.id));
    res.header('content-type', 'application/json');
    res.send(JSON.stringify(row));
});

router.post('/', async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        result.success = await create_movie(reqJson);
    } catch (e) {
        result.success = false
    } finally {
        res.header('content-type', 'application/json');
        res.send(JSON.stringify(result));
    }
});

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

module.exports = router;