const express = require('express')
const path = require('path')

const port = process.env.PORT || 5000
const app = express()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/hello', (req, res) => {
  res.send({ 'hello':'Hello World!'})
})

app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`);
})