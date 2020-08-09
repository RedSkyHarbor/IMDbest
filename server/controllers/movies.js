const { get_movies, get_movie, search_movie, create_movie } = require('../services/movies');

// TODO input validation with JOI

/* gets all movies */
// TODO Maybe should be in the index route
const getMovies = async (req, res) => {
    // TODO Status code
    // TODO pagination
    const rows = await get_movies();
    res.header('content-type', 'application/json');
    res.send(JSON.stringify(rows));
}

/* gets movie with specific id */
const getMovie = async (req, res) => {
    // TODO if row empty return status 404 and send `A movie with the id:${movieId} was not found`
    //TODO Status code
    const row = await get_movie(parseInt(req.params.id));
    res.header('content-type', 'application/json');
    res.send(JSON.stringify(row));
}

/* search for movies by title*/
// TODO order by rating
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