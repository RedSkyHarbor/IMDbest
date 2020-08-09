const express = require('express');
const router = express.Router();
const { pool } = require('../server-config');

router.post('/registration', async (req, res) => {
    // TODO input validation with NPM package JOI
    // if fails validation status code 400 Bad Request
    let result = {}
    try {
        const reqJson = req.body;
        result.success = await registration(reqJson);
    } catch (e) {
        result.success = false;
    } finally {
        res.header('content-type', 'application/json');
        res.send(JSON.stringify(result));
    }
});

async function registration(userData) {
    let { username, password, email, is_admin } = userData;
    try {
        await pool.query('INSERT INTO users (uname, pword, email, is_admin) VALUES ($1, $2, $3, $4)', [username, password, email, is_admin]);
        // TODO return the object that was inserted (without the password)
        return true;
    } catch (e) {
        // TODO If the insert fails, tell the user WHY it failed instead of false, but DONT send them e
        return false;
    }
}

module.exports = router;