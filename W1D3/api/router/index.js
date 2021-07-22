const express = require("express");
const game = require("../controller/game.controller");

const router = express.Router();
router.route("/games").get(game.getAllGame);
module.exports = router;
