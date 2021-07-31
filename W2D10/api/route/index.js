const express = require("express");
const router = express.Router();
const jobController = require("../controller/job.controller");

router.route("/jobs").get(jobController.getAllJobs).post(jobController.addJob);

router
  .route("/jobs/:id")
  .get(jobController.getOne)
  .put(jobController.fullUpdate)
  .patch(jobController.partialUpdate)
  .delete(jobController.deleteById);

module.exports = router;
