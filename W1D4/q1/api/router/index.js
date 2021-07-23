const express = require("express");
const game = require("../controller/game.controller");
const controllerPublisher = require("../controller/publisher.Controller");
const router = express.Router();

router.route("/games").get(game.getAllGame);
router.route("/games/:gameId").get(game.gameGetOne);

router
  .route("/game/:gameId/publisher")
  .get(controllerPublisher.publisherGetOne);

module.exports = router;
