const express = require("express");
const studentController = require("../controller/students.controller");
const courseController = require("../controller/courses.controller");

const router = express.Router();

router
  .route("/students")
  .get(studentController.getAll)
  .post(studentController.createStudent);

router
  .route("/students/:studentId")
  .get(studentController.getById)
  .put(studentController.studentFullUpdate)
  .patch(studentController.partialUpdateStudent)
  .delete(studentController.delete);

router
  .route("/students/:studentId/courses")
  .get(courseController.getAll)
  .post(courseController.createCource);

router
  .route("/students/:studentId/courses/:courseId")
  .get(courseController.getOne)
  .put(courseController.fullUpdateCourse)
  .patch(courseController.partialUpdateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
