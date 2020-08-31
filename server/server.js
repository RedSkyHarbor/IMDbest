const express = require("express");
const path = require("path");
const cors = require("cors");

// Require routes
const index = require("./routes/index");
const movies = require("./routes/movies");
const sessions = require("./routes/sessions");
const ratings = require("./routes/ratings");

// Configure cors to only accept requests from our client
const corsOptions = {
  origin: "https://imdbest.herokuapp.com/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));

//Routes
app.use("/api", index);
app.use("/api/movies", movies);
app.use("/api/sessions", sessions);
app.use("/api/ratings", ratings);

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
