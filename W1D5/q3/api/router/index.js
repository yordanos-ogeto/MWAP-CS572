const express = require("express");

const controllerGame = require("../controller/game.controller");
const publisherController = require("../controller/publisher.Controller");
const reviewController = require("../controller/reviews.controller");

const router = express.Router();

router
  .route("/games")
  .get(controllerGame.getAllGame)
  .post(controllerGame.addOneGame);

router
  .route("/games/:gameId")
  .get(controllerGame.gameGetOne)
  .put(controllerGame.fullyUpdateGame)
  .patch(controllerGame.PartialUpdateGame)
  .delete(controllerGame.gamesDeleteOne);

router
  .route("/game/:gameId/publisher")
  .get(publisherController.createPublisher)
  .put(publisherController.publisherFullyUpdate)
  .patch(publisherController.partialUpdatePublisherGame)
  .delete(publisherController.createPublisher)
  .post(publisherController.createPublisher);

router
  .route("/games/:gameId/reviews")
  .get(reviewController.getGameReviews)
  .post(reviewController.createReview);

router
  .route("games/:gameId/reviews/:reviewId")
  .get(reviewController.getOneReview)
  .put(reviewController.reviewFullyUpdate)
  .patch(reviewController.partialUpdateReviewGame)
  .delete(reviewController.deleteReview)
  .post(reviewController.createReview);

module.exports = router;
