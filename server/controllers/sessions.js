const { Validator } = require('node-input-validator');
const { registration } = require('../services/sessions');

const postRegistration = async (req, res) => {

    const validator = new Validator(req.body, {
        username: 'required|string|minLength:3|maxLength:31',
        password: 'required|string|minLength:5|maxLength:256',
        email: 'required|email|maxLength:64',
        is_admin: 'required|boolean'
    });

    const matched = await validator.check();

    if (!matched) {
        res.status(400).send(validator.errors);
        return;
    }

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