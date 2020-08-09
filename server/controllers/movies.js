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
    // TODO Status code
    let result = {}
    try {
        const reqJson = req.body;
        result.success = await create_movie(reqJson);
    } catch (e) {
        result.success = false;
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