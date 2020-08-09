const moviesService = require('../services/movies');

const getMovies = async (req, res) => {
    const rows = await moviesService.get_movies();
    res.header('content-type', 'application/json');
    res.send(JSON.stringify(rows));
}

const getMovie = async (req, res) => {
    // TODO if row empty return status 404 and send `A movie with the id:${movieId} was not found`
    row = await moviesService.get_movie(parseInt(req.params.id));
    res.header('content-type', 'application/json');
    res.send(JSON.stringify(row));
}

const postMovie = async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        result.success = await moviesService.create_movie(reqJson);
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
    postMovie
};