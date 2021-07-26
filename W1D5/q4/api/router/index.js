const express = require("express");
const studentController = require("../controller/students.controller");

const router = express.Router();

router
  .route("/students")
  .get(studentController.getAll)
  .post(studentController.createStudent);

router
  .route("/students/:studentId")
  .get(studentController.getById)
  .post(studentController.createStudent)
  .put(studentController.studentFullUpdate)
  .patch(studentController.partialUpdateStudent)
  .delete(studentController.deleteStudent);

module.exports = router;
