const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGetOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.find(gameId)
    .select("publisher")
    .exec(function (err, publisher) {
      console.log("Found Game ", publisher);
      res.status(200).json(publisher);
    });
};
