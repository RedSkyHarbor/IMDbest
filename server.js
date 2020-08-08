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
	catch (e) {
		console.error(`Failed to connect ${e}`)
	}
}


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/hello', (req, res) => {
	res.send({ 'hello': 'Hello World!' })
})

// Routes
app.post('/api/registration', async (req, res) => {
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
})

app.get('/api/movie/:id?', async (req, res) => {
	let rows;
	if (req.params.id) {
		rows = await get_movie(req.params.id);
	} else {
		rows = await get_movies();
	}
	res.header('content-type', 'application/json');
	res.send(JSON.stringify(rows));
})

app.post('/api/movie', async (req, res) => {
	let result = {}
	try {
		const reqJson = req.body;
		result.success = await create_movie(reqJson);
	} catch (e) {
		result.success = false
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
	} catch (e) {
		// TODO If the insert fails, tell the user WHY it failed instead of false, but DONT send them e
		return false;
	}
}


async function create_movie(movieData) {
	let { title, slug, genres, release_date, length, fcc_rating, picture_url, summary } = movieData;
	try {
		await pool.query('INSERT INTO movies (title, slug, genres, release_date, length, fcc_rating, picture_url, summary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [title, slug, genres, release_date, length, fcc_rating, picture_url, summary]);
		return true;
	} catch (e) {
		// TODO If insert fails tell user WHY. Is a movie with this title already in the DB?
		return false;
	}
}

async function get_movies() {
	try {
		// TODO this query is undounded
		const results = await pool.query('SELECT * FROM movies');
		return results.rows;
	} catch (e) {
		return [];
	}
}

async function get_movie(movieId) {
	try {
		const results = await pool.query('SELECT * FROM movies WHERE id=$1', [movieId]);
		return results.rows;
	} catch (e) {
		return [];
	}
}


