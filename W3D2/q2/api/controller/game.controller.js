// const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");
module.exports.getAllGame = function (req, res) {
  console.log("Get the Game");

  let offset = 0;
  let count = 5;
  let maxCount = 7;
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (count > maxCount) {
    res.status(400).json({ message: "Cannot exceed count of " + maxCount });
    return;
  }
  //console.log("game list for count : " + count + "for offset : " + offset);
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(404)
      .json({ message: "Querystring offset and count should be numbers" });
  }
  Game.find()
    .skip(offset)
    .limit(count)
    .exec()
    .then((game) => res.status(200).json(game))
    .catch((err) => res.status(500).json(err));
};
module.exports.gameGetOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .exec()
    .then((game) => getOne(game, res))
    .catch((err) => res.status(500).json(err));
};

function getOne(game, res) {
  const response = {
    status: 200,
    message: doc,
  };
  if (!game) {
    response.status = 404;
    response.message = { message: "Resource not found!" };
  }

  res.status(response.status).json(response.message);
}
module.exports.addOneGame = function (req, res) {
  console.log("post new game");
  console.log("req.body");
  const newGame = {
    title: req.body.title,
    price: parseFloat(req.body.price),
    year: parseInt(req.body.year),
    minPlayer: parseInt(req.body.minPlayer),
    maxPlayer: parseInt(req.body.maxPlayer),
    rate: parseInt(req.body.rate),
    designer: [req.body.designer],
    publisher: {},
  };
  Game.create(newGame)
    .then((game) => res.status(201).json(game))
    .catch((err) => res.status(500).json(err));
};
module.exports.fullyUpdateGame = function (req, res) {
  console.log("fully update requiest recieved");
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .select("-reviews -publisher")
    .exec()
    .then((game) => fullUpdateGame(game, req, res))
    .then((game) => res.status(204).json(game))
    .catch((err) => res.status(500).json(err));
};
function fullUpdateGame(game, req, res) {
  if (!game) {
    res.status(404).json({ message: "game not found" });
  }

  game.title = req.body.title;
  game.year = parseInt(req.body.year);
  game.rate = parseInt(req.body.rate);
  game.price = parseFloat(req.body.price);
  game.minPlayers = parseInt(req.body.minPlayers);
  game.maxPlayers = parseInt(req.body.maxPlayers);
  game.minAge = parseInt(req.body.minAge);
  game.designers = req.body.designers;

  return game.save();
}
module.exports.PartialUpdateGame = function (req, res) {
  console.log("partial update game requiest recieved");
  const gameID = req.params.gameID;

  Game.findById(gameID)
    .select("-reviews -publisher")
    .exec()
    .then((game) => partialUpdateGame(game, req, res))
    .then((game) => res.status(204).json(game))
    .catch((err) => res.status(500).json(err));
};
function partialUpdateGame(game, req, res) {
  if (req.body.title) {
    game.title = req.body.title;
  }
  if (req.body.year) {
    game.year = parseInt(req.body.year);
  }
  if (req.body.rate) {
    game.rate = parseInt(req.body.rate);
  }
  if (req.body.price) {
    game.price = parseFloat(req.body.price);
  }
  if (req.body.minPlayers) {
    game.minPlayers = parseInt(req.body.minPlayers);
  }
  if (req.body.maxPlayers) {
    game.maxPlayers = parseInt(req.body.maxPlayers);
  }
  if (req.body.minAge) {
    game.minAge = parseInt(req.body.minAge);
  }
  if (req.body.designers) {
    game.designers = req.body.designers;
  }

  return game.save();
}
module.exports.gamesDeleteOne = function (req, res) {
  const gameID = req.params.gameID;
  Game.findByIdAndRemove(gameID)
    .then((game) => responseDeleteGame(game, res))
    .catch((err) => res.status(500).json(err));
};
function responseDeleteGame(game, res) {
  const response = {
    status: 204,
  };

  if (!game) {
    response.status = 404;
    response.message = { messageg: "game not found" };
  }

  res.status(response.status).json(response.message);
}
