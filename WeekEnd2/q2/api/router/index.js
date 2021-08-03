const express = require("express");
const controllerGame = require("../controller/game.controller");
const publisherController = require("../controller/publisher.Controller");
const userController = require("../controller/users.controller");
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
  .route("/games/:gameId/publisher")
  .get(publisherController.publisherGetOne)
  .post(publisherController.createPublisher)
  .put(publisherController.publisherFUllUpdateOne)
  .patch(publisherController.partialUpdatePublisher)
  .delete(publisherController.publisherDeleteOne);

router.route("/users").post(userController.register);
router.route("/users/login").post(userController.login);

module.exports = router;
