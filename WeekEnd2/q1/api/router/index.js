const express = require("express");
const controllerSwimmer = require("../controller/swimmerTeam.controller");
const memberController = require("../controller/teamMember.Controller");
const userController = require("../controller/users.controller");
const router = express.Router();
router
  .route("/swimmerTeam")
  .get(controllerSwimmer.getAllTeam)
  .post(controllerSwimmer.addOneSwimTeam);

router
  .route("/swimmerTeam/:swimId")
  .get(controllerSwimmer.getOneTeam)
  .put(controllerSwimmer.fullyUpdateSwimmer)
  .patch(controllerSwimmer.partialUpdateSwim)
  .delete(controllerSwimmer.DeleteOne);

router
  .route("/swimmerTeam/:swimId/swimmer")
  .get(memberController.GetOneMember)
  .post(memberController.createMember);

router
  .route("/swimmerTeam/:swimId/swimmer/swimmerId")
  .get(memberController.GetOneMember)
  .put(memberController.memberFUllUpdateOne)
  .delete(memberController.DeleteOne);

router.route("/users").post(userController.register);
router.route("/login").post(userController.login);
module.exports = router;
