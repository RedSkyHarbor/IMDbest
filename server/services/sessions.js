const { pool } = require('./database-config');

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

// TODO Log in, log out

module.exports = {
    registration
}