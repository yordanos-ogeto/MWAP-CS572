const express = require("express");
const controllerGame = require("../controller/game.controller");
const router = express.Router();

router
  .route("/games")
  .get(controllerGame.getAllGame)
  .post(controllerGame.addOneGame);

router
  .route("/games/:gameId")
  .get(controllerGame.gameGetOne)
  .post(controllerGame.addOneGame)
  .put(controllerGame.fullyUpdateGame)
  .patch(controllerGame.partialUpdateGame)
  .delete(controllerGame.gamesDeleteOne);

module.exports = router;
