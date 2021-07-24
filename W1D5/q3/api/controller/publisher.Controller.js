const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getOnePublisher = function (req, res) {
  const gameID = req.params.gameID;
  const publisherId = req.params.publisherId;
  console.log("ID ", publisherId);

  Game.findById(gameID, function (err, game) {
    const doc = game.publisher.id(publisherId);
    console.log(doc);
    res.status(200).json(doc);
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
        response.message = { message: "Your requested unavailable resource" };
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
module.exports.publisherFullyUpdate = function (req, res) {
  console.log(`Performing full update on publisher`);

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
        response.message = { statusMessage: "game not found!" };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
        return;
      }

      fullUpdateGamePublisher(doc, req, res);
    });
};

function fullUpdateGamePublisher(game, req, res) {
  console.log("full updating publisher");

  game.publisher.name = req.body.name;

  game.publisher.country = req.body.country;

  if (req.body.location) {
    if (
      parseFloat(req.body.location.lng) &&
      parseFloat(req.body.location.lat)
    ) {
      game.publisher.location.coordinate = [
        parseFloat(req.body.location.lng),
        parseFloat(req.body.location.lat),
      ];
    } else {
      game.publisher.location.coordinate = [];
    }
    game.publisher.location.type = req.body.location.type;
  }

  game.save(function (err, update) {
    const response = {
      status: 500,
      message: err,
    };
    if (update) {
      response.status = 204;
      response.message = update.publisher;
    }
    res.status(response.status).json(response.message);
  });
}
module.exports.partialUpdatePublisherGame = function (req, res) {
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
      partialUpdateGamePublisher(doc, req, res);
    });
};

function partialUpdateGamePublisher(game, req, res) {
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

module.exports.deletePublisher = function (req, res) {
  console.log("deliting publisher object");

  Game.findById(req.params.gameId)
    .select("publisher")
    .exec(function (err, doc) {
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
      deletePublisher(doc, req, res);
    });
};

function deletePublisher(game, req, res) {
  game.publisher.remove();

  game.save(function (err, updt) {
    const response = {
      status: 204,
      message: updt,
    };

    if (err) {
      response.message = err;
      response.status = 500;
    }

    res.status(response.status).json(response.message);
  });
}
