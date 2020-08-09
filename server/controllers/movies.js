const { get_movies, get_movie, search_movie, create_movie } = require('../services/movies');

// TODO input validation with JOI

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
    const { title } = req.params;
    const rows = await search_movie(title);
    res.header('content-type', 'application/json');
    res.send(JSON.stringify(rows));
}

/* create a new movie */
const postMovie = async (req, res) => {
    // TODO should require authentication, only admins can do this
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