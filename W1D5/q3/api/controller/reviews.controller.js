const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getOneReview = function (req, res) {
  console.log("getting game review with id" + req.params.reviewId);

  Game.findById(req.params.gameId)
    .select("reviews")
    .exec(function (err, doc) {
      console.log(doc);
      const response = {
        status: 200,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = { message: "Your requested unavailable resource" };
      } else {
        response.message = doc.reviews.id(req.params.reviewId);
      }

      res.status(response.status).json(response.message);
    });
};

module.exports.getGameReviews = function (req, res) {
  console.log("Getting a game reviews");

  Game.findById(req.params.gameId)
    .select("reviews")
    .exec(function (err, doc) {
      console.log(doc);
      const response = {
        status: 200,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = { message: "Your requested unavailable resource" };
      } else {
        response.message = doc.reviews;
      }

      res.status(response.status).json(response.message);
    });
};

module.exports.createReview = function (req, res) {
  console.log("creating review");

  Game.findById(req.params.gameId)
    .select("reviews")
    .exec(function (err, doc) {
      console.log("game for review", doc);
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

      addReviewToGame(doc, req, res);
    });
};

function addReviewToGame(game, req, res) {
  console.log("adding review");

  const review = {
    name: req.body.name,
    review: req.body.review,
    rating: req.body.rating,
  };
  if (!game.reviews) {
    game.reviews = [];
  }

  game.reviews.push(review);

  console.log(game.reviews, review);

  game.save(function (err, updt) {
    const response = {
      status: 500,
      message: err,
    };
    if (updt) {
      response.status = 201;
      response.message = updt.reviews;
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.reviewFullyUpdate = function (req, res) {
  console.log(`Performing full update on review`);

  Game.findById(req.params.gameId)
    .select("reviews")
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

      fullUpdateGameReview(doc, req, res);
    });
};

function fullUpdateGameReview(game, req, res) {
  console.log("full updating review");

  const reviewToUpdate = game.reviews.id(req.params.reviewId);

  if (!reviewToUpdate) {
    res.status(404).json({ message: "review not found" });
  }

  reviewToUpdate.name = req.body.name;
  reviewToUpdate.review = req.body.review;
  reviewToUpdate.rating = req.body.rating;

  game.save(function (err, update) {
    const response = {
      status: 500,
      message: err,
    };
    if (update) {
      response.status = 204;
      response.message = update.reviews.id(req.params.reviewId);
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.partialUpdateReviewGame = function (req, res) {
  console.log(
    `performing patch update for game ${req.params.gameId} review with id ${req.params.reviewId}`
  );

  Game.findById(req.params.gameId)
    .select("reviews")
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
      partialUpdateGameReviews(doc, req, res);
    });
};

function partialUpdateGameReviews(game, req, res) {
  const reviewToUpdate = game.reviews.id(req.params.reviewId);

  if (!reviewToUpdate) {
    res.status(404).json({ message: "review not found" });
  }

  if (req.body.name) {
    reviewToUpdate.name = req.body.name;
  }
  if (req.body.review) {
    reviewToUpdate.review = req.body.review;
  }
  if (req.body.rating) {
    reviewToUpdate.rating = req.body.rating;
  }

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
  });
}

module.exports.deleteReview = function (req, res) {
  console.log("deliting review from game");

  Game.findById(req.params.gameId)
    .select("reviews")
    .exec(function (err, game) {
      const response = {
        status: 204,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        response.status = 404;
        response.message = { statusMessage: "game not found!" };
      }

      if (response.status !== 204) {
        res.status(response.status).json(response.message);
        return;
      }
      deleteReview(game, req, res);
    });
};

function deleteReview(game, req, res) {
  const reviewToUpdate = game.reviews.id(req.params.reviewId);

  if (!reviewToUpdate) {
    res.status(404).json({ message: "review not found" });
  }

  reviewToUpdate.remove();

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
