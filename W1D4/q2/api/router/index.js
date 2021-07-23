const express = require("express");
const studentController = require("../controller/studentController");
const courseController = require("../controller/courseController");
const router = express.Router();

router.route("/students").get(studentController.getAllStudent);
router.route("/students/:studentsId").get(studentController.getAllStudentById);
router
  .route("/students/:studentsId/course")
  .get(courseController.getAllStudent);

module.exports = router;
