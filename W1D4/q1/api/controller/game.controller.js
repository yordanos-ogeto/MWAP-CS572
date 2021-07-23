// const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");
module.exports.getAllGame = function (req, res) {
  // console.log("Get the Game");
  // console.log(req.query);
  let offset = 0;
  let count = 5;
  let maxCount = 7;
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.count > maxCount) {
    count = maxCount;
  }
  //console.log("game list for count : " + count + "for offset : " + offset);
  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, doc) {
      console.log("doc" + doc);
      res.status(200).json(doc);
    });
};
module.exports.gameGetOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    console.log("Found Game", game);
    res.status(200).json(game);
  });
};
// module.exports.getAllGameById = function (req, res) {
//   Game.findById(req.params.gameId).exec(function (err, doc) {
//     res.status(200).json(doc);
//   });
// };
