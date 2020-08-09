const { pool } = require('./database-config');
const bcrypt = require('bcrypt');


async function registration(username, password, email, is_admin) {

    try {
        const hash = bcrypt.hashSync(password, 10);
        const results = await pool.query('INSERT INTO users (username, password, email, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, username, email, is_admin', [username, hash, email, is_admin]);
        return results.rows;
    } catch (e) {
        if (e.code === '23505') {
            if (e.constraint === 'users_username_key') {
                return `An account with the username ${username} already exists.`;
            } else if (e.constraint === 'users_email_key') {
                return `An account with the email ${email} already exists.`;
            }
        }
        return false;
    }
}

// TODO Log in, log out

module.exports = {
    registration
}