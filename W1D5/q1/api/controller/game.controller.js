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
    year: parseInt(req.body.year),
    rate: parseInt(req.body.rate),
    price: parseFloat(req.body.price),
    minPlayer: parseInt(req.body.minPlayer),
    maxPlayer: parseInt(req.body.maxPlayer),
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
  console.log(" fully updated " + req.body);

  Game.findById(req.params.gameId)
    .select("-reviews -publisher")
    .exec(function (err, game) {
      const response = {
        status: 204,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        response.status = 404;
        response.message = { statusMessage: "page not found!" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
        return;
      }

      fullUpdate(game, req, res);
    });
};

function fullUpdate(game, req, res) {
  game.title = req.body.title;
  game.year = parseInt(req.body.year);
  game.rate = parseInt(req.body.rate);
  game.price = parseFloat(req.body.price);
  game.minPlayers = parseInt(req.body.minPlayers);
  game.maxPlayers = parseInt(req.body.maxPlayers);
  game.minAge = parseInt(req.body.minAge);
  game.designers = req.body.designers;

  game.save(function (err, updatedGame) {
    const response = {
      status: 204,
      message: updatedGame,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
    // res.status(200).json("response is called");
  });
}
module.exports.partialUpdateGame = function (req, res) {
  console.log("partially updated :" + req.params.gameId);

  Game.findById(req.params.gameId)
    .select("-reviews -publisher")
    .exec(function (err, doc) {
      console.log(doc);
      const response = {
        status: 204,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = { statusMessage: "resource not found!" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
        return;
      }
      partialUpdate(doc, req, res);
    });
};

function partialUpdate(doc, req, res) {
  if (req.body.title) {
    doc.title = req.body.title;
  }
  if (req.body.year) {
    doc.year = parseInt(req.body.year);
  }
  if (req.body.rate) {
    doc.rate = parseInt(req.body.rate);
  }
  if (req.body.price) {
    doc.price = parseFloat(req.body.price);
  }
  if (req.body.minPlayers) {
    doc.minPlayers = parseInt(req.body.minPlayers);
  }
  if (req.body.maxPlayers) {
    doc.maxPlayers = parseInt(req.body.maxPlayers);
  }
  if (req.body.minAge) {
    doc.minAge = parseInt(req.body.minAge);
  }
  if (req.body.designers) {
    doc.designers = req.body.designers;
  }

  doc.save(function (err, updatedGame) {
    const response = {
      status: 204,
      message: updatedGame,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }
    console.log(doc);
    res.status(response.status).json(response.message);
  });
}
module.exports.gamesDeleteOne = function (req, res) {
  console.log("game deleted");
  const gameID = req.params.gameId;
  Game.findByIdAndRemove(gameID, function (err, game) {
    const response = {
      status: 204,
      message: game,
    };
    console.log("game deleted2");

    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }

    res.status(response.status).json(response.message);
  });
};
