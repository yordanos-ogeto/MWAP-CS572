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
    .exec(function (err, game) {
      const response = {
        status: 200,
        message: game,
      };
      if (err) {
        console.log("Error finding game", err);
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
};
module.exports.gameGetOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 200,
      message: game,
    };
    if (err) {
      console.log("Error finding game");
      response.status = 200;
      response.message = err;
    } else if (!game) {
      response.status = 400;
      response.message = { message: "Game id not found" };
    }
    res.status(response.status).json(response.message);
  });
};

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
  Game.create(newGame, function (err, game) {
    const response = {
      status: 201,
      message: game,
    };
    res.status(response.status).json(response.message);
  });
};
module.exports.fullyUpdateGame = function (req, res) {
  console.log("fully update requiest recieved");
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 204,
      message: game,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = { message: "Game id not found" };
    } else {
      game.title = req.body.title;
      game.price = parseFloat(req.body.price);
      game.year = parseInt(req.body.year);
      game.minPlayers = parseInt(req.body.minPlayers);
      game.maxPlayers = parseInt(req.body.maxPlayers);
      game.minAge = parseInt(req.body.minAge);
      game.rate = parseInt(req.body.rate);
      game.designers = req.body.designers;
      game.publisher = {};
      game.save(function (err, updateGame) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updateGame;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};
module.exports.PartialUpdateGame = function (req, res) {
  console.log("partial update game requiest recieved");
  const gameID = req.params.gameID;
  if (gameID.length != 24) {
    res
      .status(404)
      .json({ message: "RequiestParam Game ID is not propper format" });
  }

  Game.findById(gameID).exec(function (err, game) {
    const response = {
      status: 204,
      message: game,
    };

    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }

    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      //This is where update happens
      if (req.body.title) {
        game.title = req.body.title;
      }

      if (req.body.price) {
        game.price = parseFloat(req.body.price);
      }

      if (req.body.year) {
        game.year = parseInt(req.body.year);
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

      if (req.body.rate) {
        game.rate = parseInt(req.body.rate);
      }

      if (req.body.designers) {
        game.designers = req.body.designers;
      }

      game.save(function (err, updatedGame) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedGame;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.gamesDeleteOne = function (req, res) {
  const gameID = req.params.gameID;
  Game.findByIdAndRemove(gameID).exec(function (err, deletedGame) {
    const response = {
      status: 204,
      message: deletedGame,
    };

    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!deletedGame) {
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }

    res.status(response.status).json(response.message);
  });
};
