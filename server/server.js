const express = require("express");
const path = require("path");
const cors = require("cors");

// Require routes
const index = require("./routes/index");
const movies = require("./routes/movies");
const sessions = require("./routes/sessions");
const ratings = require("./routes/ratings");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

//Routes
app.use("/api", index);
app.use("/api/movies", movies);
app.use("/api/sessions", sessions);
app.use("/api/ratings", ratings);

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
