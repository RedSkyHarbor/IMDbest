const { get_movie_card_data } = require("../services/index");

const getMovieCardData = async (req, res) => {
  const rows = await get_movie_card_data();
  res.header("content-type", "application/json");
  res.send(JSON.stringify(rows));
};

module.exports = {
  getMovieCardData,
};
