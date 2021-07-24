const express = require("express");
const controllerGame = require("../controller/game.controller");
const publisherController = require("../controller/publisher.Controller");
const router = express.Router();
router
  .route("/games")
  .get(controllerGame.getAllGame)
  .post(controllerGame.addOneGame);

router
  .route("/games/:gameId")
  .get(controllerGame.gameGetOne)
  .put(controllerGame.fullUpdateGame)
  .patch(controllerGame.partialUpdateGame)
  .delete(controllerGame.gamesDeleteOne);

router
  .route("/game/:gameId/publisher")
  .get(publisherController.publisherGetOne)
  .put(publisherController.publisherFUllUpdateOne)
  .patch(publisherController.partialUpdatePublisher)
  .delete(publisherController.publisherDeleteOne)
  .post(publisherController.createPublisher);

module.exports = router;
