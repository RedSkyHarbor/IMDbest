const express = require('express');
const path = require('path');

// Require routes
const index = require('./routes/index');
const movies = require('./routes/movies');
const sessions = require('./routes/sessions');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//Routes
app.use('/', index);
app.use('/api/movies', movies);
app.use('/api/sessions', sessions);

app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`);
})