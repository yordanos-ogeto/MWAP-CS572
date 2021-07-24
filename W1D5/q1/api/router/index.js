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
  .put(controllerGame.fullUpdateGame)
  .patch(controllerGame.partialUpdateGame)
  .delete(controllerGame.gamesDeleteOne);

module.exports = router;
