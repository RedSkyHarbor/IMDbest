const { Validator } = require('node-input-validator');
const { get_movies, get_movie, search_movie, create_movie } = require('../services/movies');

// TODO delete movie, update movie

/* gets all movies */
const getMovies = async (req, res) => {
    const rows = await get_movies();
    res.header('content-type', 'application/json');
    res.send(JSON.stringify(rows));
}

/* gets movie with specific id */
const getMovie = async (req, res) => {
    const { id } = req.params;
    const row = await get_movie(parseInt(id));
    res.header('content-type', 'application/json');
    res.send(JSON.stringify(row));
}

/* search for movies by title */
const searchMovie = async (req, res) => {

    const validator = new Validator(req.body, {
        title: 'required|string|maxLength:128'
    });

    const matched = await validator.check();

    if (!matched) {
        res.status(400).send(validator.errors);
        return;
    }

    const { title } = req.params;
    const rows = await search_movie(title);
    res.header('content-type', 'application/json');
    res.send(JSON.stringify(rows));
}

/* create a new movie */
const postMovie = async (req, res) => {
    // TODO should require authentication, only admins can do this

    const validator = new Validator(req.body, {
        title: 'required|string|maxLength:128',
        slug: 'required|string|maxLength:128',
        genres: 'required|string|maxLength:64',
        release_date: 'required|string|minLength:10|maxLength:64',
        length: 'required|string|minLength:2|maxLength:64',
        fcc_rating: 'required|string|maxLength:5',
        picture_url: 'required|string|maxLength:255',
        summary: 'required|string|maxLength:511'
    });

    const matched = await validator.check();

    if (!matched) {
        res.status(400).send(validator.errors);
        return;
    }


    let result = {}
    try {
        const { title, slug, genres, release_date, length, fcc_rating, picture_url, summary } = await req.body;
        result.response = await create_movie(title, slug, genres, release_date, length, fcc_rating, picture_url, summary);
        res.status(200);
    } catch (e) {
        res.status(400);
        result.response = false;
    } finally {
        res.header('content-type', 'application/json');
        res.send(JSON.stringify(result));
    }
}

module.exports = {
    getMovies,
    getMovie,
    searchMovie,
    postMovie
};