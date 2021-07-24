const mongo = require("mongoose");
const Student = mongo.model("Student");

module.exports.getAll = function (req, res) {
  console.info("requested to return student list");

  let offset = 0;
  let count = 5;
  //let maxCount = 7;

  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }

  if (isNaN(count) || isNaN(offset)) {
    res.status(400).json({ message: "Invalide query parameters" });
    return;
  }

  Student.findById(req.params.studentId)
    .select("courses")
    .exec(function (err, doc) {
      const response = {
        status: 200,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      }
      if (doc) {
        response.message = doc.courses;
      }
      res.status(response.status).json(response.message);
    });
};

module.exports.getOne = function (req, res) {
  console.log(
    `returning student with id ${req.params.studentId} and course with id ${req.params.courseId}`
  );

  Student.findById(req.params.studentId)
    .select("courses")
    .exec(function (err, doc) {
      const response = {
        status: 200,
        message: doc,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      }
      if (!doc) {
        response.status = 404;
        response.message = { message: "Resource not found!" };
      }
      res.status(response.status).json(response.message);
    });
};

module.exports.createCource = function (req, res) {
  console.log("creating course");

  Student.findById(req.params.courseId)
    .select("courses")
    .exec(function (err, doc) {
      const response = {
        status: 200,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = { message: "Your requested unavailable resource" };
      }

      if (response.status !== 200) {
        res.status(response.status).json(response.message);
        return;
      }

      addCourseToStudent(doc, req, res);
    });
};

function addCourseToStudent(student, req, res) {
  console.log("adding course");

  const course = {
    courseNumber: req.body.courseNumber,
    name: req.body.name,
    description: req.body.description,
  };
  if (!student.courses) {
    student.courses = [];
  }

  student.courses.push(course);

  console.log(student.courses, course);

  student.save(function (err, updt) {
    const response = {
      status: 500,
      message: err,
    };
    if (updt) {
      response.status = 201;
      response.message = updt.courses;
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.fullUpdateCourse = function (req, res) {
  Student.findById(req.params.studentId)
    .select("courses")
    .exec(function (err, doc) {
      const response = {
        status: 200,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = { statusMessage: "student not found!" };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
        return;
      }

      fullUpdate(doc, req, res);
    });
};

function fullUpdate(student, req, res) {
  console.log("full updating student course");

  const courseToUpdate = student.courses.id(req.params.courseId);

  if (!courseToUpdate) {
    res.status(404).json({ message: "course not found" });
  }

  courseToUpdate.name = req.body.name;
  courseToUpdate.courseNumber = req.body.courseNumber;
  courseToUpdate.description = req.body.description;

  student.save(function (err, updt) {
    const response = {
      status: 500,
      message: err,
    };
    if (updt) {
      response.status = 204;
      response.message = updt.courses.id(req.params.courseId);
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.partialUpdateCourse = function (req, res) {
  Student.findById(req.params.studentId)
    .select("courses")
    .exec(function (err, doc) {
      console.log(doc);
      const response = {
        status: 204,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = { statusMessage: "student not found!" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
        return;
      }
      partialCource(doc, req, res);
    });
};

function partialCource(student, req, res) {
  const couru = student.courses.id(req.params.courseId);

  if (!couru) {
    res.status(404).json({ message: "student not found" });
  }

  if (req.body.name) {
    couru.name = req.body.name;
  }
  if (req.body.description) {
    couru.description = req.body.description;
  }
  if (req.body.courseNumber) {
    couru.courseNumber = req.body.courseNumber;
  }

  student.save(function (err, stu) {
    const response = {
      status: 204,
      message: stu,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.deleteCourse = function (req, res) {
  Student.findById(req.params.studentId)
    .select("courses")
    .exec(function (err, doc) {
      const response = {
        status: 204,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = { statusMessage: "student not found!" };
      }

      if (response.status !== 204) {
        res.status(response.status).json(response.message);
        return;
      }
      deleteCourse(doc, req, res);
    });
};

function deleteCourse(student, req, res) {
  const _course = student.courses.id(req.params.courseId);

  if (!_course) {
    res.status(404).json({ message: "course not found" });
  }

  _course.remove();

  student.save(function (err, updt) {
    const response = {
      status: 204,
      message: updt,
    };

    if (err) {
      response.message = err;
      response.status = 500;
    }

    res.status(response.status).json(response.message);
  });
}
