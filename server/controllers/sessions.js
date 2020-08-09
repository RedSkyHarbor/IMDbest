const sessionsService = require('../services/sessions');

const postRegistration = async (req, res) => {
    // TODO input validation with NPM package JOI
    // if fails validation status code 400 Bad Request
    let result = {}
    try {
        const reqJson = req.body;
        result.success = await sessionsService.registration(reqJson);
    } catch (e) {
        result.success = false;
    } finally {
        res.header('content-type', 'application/json');
        res.send(JSON.stringify(result));
    }
}

// TODO Log in, log out

module.exports = {
    postRegistration
}