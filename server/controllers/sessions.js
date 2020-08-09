const { registration } = require('../services/sessions');

const postRegistration = async (req, res) => {
    // TODO input validation with NPM package JOI
    // if fails validation status code 400 Bad Request
    let result = {}
    try {
        let { username, password, email, is_admin } = await req.body;
        result.response = await registration(username, password, email, is_admin);
    } catch (e) {
        result.response = false;
    } finally {
        res.header('content-type', 'application/json');
        res.send(JSON.stringify(result));
    }
}

// TODO Log in, log out

module.exports = {
    postRegistration
}