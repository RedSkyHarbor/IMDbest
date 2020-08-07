const express = require('express')
const path = require('path')
const { pool } = require('./server-config');

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())

connect()
async function connect() {
	// Connect to database
	try {
		await pool.connect()
	}
	catch(e) {
		console.error(`Failed to connect ${e}`)
	}
}


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/hello', (req, res) => {
	res.send({ 'hello':'Hello World!'})
})

// Routes
app.get('/api/get_users', async (req, res) => {
	const rows = await get_users();
	res.header('content-type', 'application/json');
	res.send(JSON.stringify(rows));
})

app.post('/api/registration', async (req, res) => {
	let result = {}
	try {
		const reqJson = req.body;
		result.success = await registration(reqJson);
	} catch(e) {
		console.log(e)
		result.success = false;
	} finally {
		res.header('content-type', 'application/json');
		res.send(JSON.stringify(result));
	}
})


app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`);
})


// Handlers
async function registration(userData) {
	let { username, password, email, is_admin } = userData;
	try {
		await pool.query('INSERT INTO users (uname, pword, email, is_admin) VALUES ($1, $2, $3, $4)', [username, password, email, is_admin]);
		return true;
	} catch(e) {
		console.log(e);
		return false;
	}
}

async function get_users() {
	try {
		const results = await pool.query('SELECT * FROM users');
		return results.rows;
	} catch(e) {
		return [];
	}
}


