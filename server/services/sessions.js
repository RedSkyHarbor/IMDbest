const { pool } = require('./database-config');
const bcrypt = require('bcrypt');
const e = require('express');


async function registration(username, password, email, is_admin) {
    try {
        const hash = bcrypt.hashSync(password, 10);
        const results = await pool.query('INSERT INTO users (username, password, email, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, username, is_admin', [username, hash, email, is_admin]);
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

async function log_in(username, plaintext_password, is_admin) {
    try {
        const results = await pool.query('SELECT * FROM users WHERE username=$1 AND is_admin=$2', [username, is_admin]);
        const hashed_password = results.rows[0].password;
        if (bcrypt.compareSync(plaintext_password, hashed_password)) {
            const { id, username, is_admin } = results.rows[0];
            return { id, username, is_admin };
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

module.exports = {
    registration,
    log_in
}