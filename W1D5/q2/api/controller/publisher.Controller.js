const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGetOne = function (req, res) {
  console.log("publisherGetOne");
  const gameID = req.params.gameId;
  Game.findById(gameID)
    .select("publisher")
    .exec(function (err, game) {
      const response = {
        status: 200,
        message: game,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        response.status = 404;
        response.message = { message: "game not found" };
      } else {
        response.message = game.publisher;
      }
      res.status(200).json(game.publisher);
    });
};

module.exports.createPublisher = function (req, res) {
  console.log("creating publisher");

  Game.findById(req.params.gameId)
    .select("publisher")
    .exec(function (err, doc) {
      const response = {
        status: 200,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = {
          "message:": "Your requested unavailable resource",
        };
      }

      if (response.status !== 200) {
        res.status(response.status).json(response.message);
        return;
      }

      addPublisherToGame(doc, req, res);
    });
};
function addPublisherToGame(game, req, res) {
  console.log("adding publisher", req.body);

  game.publisher = {};
  game.publisher.location = {};

  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  if (req.body.location) {
    game.publisher.location.coordinate = [
      parseFloat(req.body.location.lng),
      parseFloat(req.body.location.lat),
    ];
    game.publisher.location.type = req.body.location.type;
  }

  console.log(game.publisher);

  game.save(function (err, updt) {
    const response = {
      status: 500,
      message: err,
    };
    if (updt) {
      response.status = 201;
      response.message = updt.publisher;
    }
    res.status(response.status).json(response.message);
  });
}
module.exports.publisherFUllUpdateOne = function (req, res) {
  const gameID = req.params.gameId;
  Game.findByIdAndUpdate(gameID, {
    publisher: {
      name: req.body.name,
      address: req.body.address,
    },
  }).exec(function (err, game) {
    console.log("Found Game ", !game);
    if (err) {
      console.log("error :", err);
      res.status(500).json(err);
      return;
    } else if (!game) {
      console.log("no game");
      res.status(404).json({ message: "GameId not found" });
      return;
    }

    if (game) {
      game.publisher.name = req.body.name;
      game.save(function (err, updatedGame) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(204).json(updatedGame.publishser);
        }
      });
    }
  });
};
module.exports.partialUpdatePublisher = function (req, res) {
  console.log(
    `performing patch update for game ${req.params.gameId} publisher`
  );

  Game.findById(req.params.gameId)
    .select("publisher")
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
        response.message = { statusMessage: "game not found!" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
        return;
      }
      patchUpdateGamePublisher(doc, req, res);
    });
};
function patchUpdateGamePublisher(game, req, res) {
  if (req.body.name) {
    game.publisher.name = req.body.name;
  }

  if (req.body.country) {
    game.publisher.country = req.body.country;
  }

  if (req.body.location) {
    if (req.body.location.lng) {
      game.publisher.location.coordinate[0] = parseFloat(req.body.location.lng);
    }

    if (req.body.location.lat) {
      game.publisher.location.coordinate[1] = parseFloat(req.body.location.lat);
    }

    if (req.body.location.type) {
      game.publisher.location.type = req.body.location.type;
    }
  }

  game.save(function (err, updatedGame) {
    const response = {
      status: 204,
      message: updatedGame.publisher,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
}
module.exports.publisherDeleteOne = function (req, res) {
  const gameID = req.params.gameId;

  Game.findById(gameID).exec(function (err, game) {
    console.log("Found Game ", game);
    if (err) {
      res.status(500).json(err);
    } else if (!game) {
      res.status(404).json({ message: "GameId not found" });
    }

    if (game) {
      game.publisher.remove();
      game.save(function (err, updatedGame) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(204).json(updatedGame.publishser);
        }
      });
      // res.status(204).json(publishser);
    }
    //res.status(200).json(publishser);
  });
};
