const mongoose = require("mongoose");
const Game = mongoose.model("Game");

function findPublisher(game) {
  const promise = new Promise((resolve, reject) => {
    if (!game) {
      reject({ status: 400, message: "game not found" });
    } else {
      resolve(game.publisher);
    }
  });
  return promise;
}

function getPublisher(publisher, res) {
  res.status(200).json(publisher);
}

function handleError(err, res) {
  if (err.message && err.status) {
    res.status(err.status).json(err.message);
    return;
  }
  res.status(500).json({ message: err });
}

module.exports.publisherGetOne = function (req, res) {
  console.log("publisherGetOne");
  const gameID = req.params.gameId;
  Game.findById(gameID)
    .select("publisher")
    .exec()
    .then(findPublisher)
    .then((publisher) => getPublisher(publisher, res))
    .then((err) => {
      handleError(err, res);
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
module.exports.createPublisher = function (req, res) {
  console.log("creating publisher");

  Game.findById(req.params.gameId)
    .exec()
    .then((game) => addPublisherToGame(game, req, res))
    .catch((err) => handleError(err, res));
};

function updatePublisher(game, req, res) {
  const response = {
    status: 200,
  };

  if (!doc) {
    response.status = 404;
    response.message = { statusMessage: "game not found!" };
  }
  if (response.status !== 200) {
    res.status(response.status).json(response.message);
    return;
  }

  console.log("full updating publisher");

  game.publisher.name = req.body.name;

  game.publisher.country = req.body.country;

  if (req.body.location) {
    if (
      parseFloat(req.body.location.lng) &&
      parseFloat(req.body.location.lat)
    ) {
      game.publisher.location.coordinates = [
        parseFloat(req.body.location.lng),
        parseFloat(req.body.location.lat),
      ];
    } else {
      game.publisher.location.coordinates = [];
    }
    game.publisher.location.type = req.body.location.type;
  }

  return game.save();
}
module.exports.publisherFUllUpdateOne = function (req, res) {
  const gameID = req.params.gameId;
  Game.findByIdAndUpdate(gameID)
    .select("publisher")
    .exec()
    .then((doc) => updatePublisher(doc, req, res))
    .then((doc) => res.status(204).json(doc))
    .catch((err) => handleError(err, res));
};
module.exports.partialUpdatePublisher = function (req, res) {
  Game.findById(req.params.gameId)
    .select("publisher")
    .exec()
    .then((game) => {
      partialUpdateGamePublisher(game, req, res);
    })
    .then((doc) => res.status(204).json(doc))
    .catch((err) => {
      handleError(err, res);
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
module.exports.publisherDeleteOne = function (req, res) {
  const gameID = req.params.gameId;

  Game.findById(req.params.gameId)
    .select("publisher")
    .exec()
    .then((game) => deletePublisher(game, res))
    .then((doc) => res.status(204).json(doc))
    .catch((err) => handleError(err, res));
};

function deletePublisher(game, res) {
  const response = {
    status: 204,
  };

  if (!game) {
    response.status = 404;
    response.message = { statusMessage: "game not found!" };
  }

  if (response.status !== 204) {
    res.status(response.status).json(response.message);
    return;
  }

  game.publisher.remove();

  return game.save();
}
