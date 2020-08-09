const { registration } = require('../services/sessions');

const postRegistration = async (req, res) => {
    let result = {};
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