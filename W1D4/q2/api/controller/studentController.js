const mongoose = require("mongoose");
const Student = mongoose.model("Student");
module.exports.getAllStudent = function (req, res) {
  // console.log("Get the Game");
  // console.log(req.query);
  let offset = 0;
  let count = 5;
  let maxCount = 7;
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.count > maxCount) {
    count = maxCount;
  }
  // console.log("game list for count : " + count + "for offset : " + offset);
  Student.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, doc) {
      // console.log(doc);
      res.status(200).json(doc);
    });
};
module.exports.getAllStudentById = function (req, res) {
  Game.findById(req.params.studentId).exec(function (err, doc) {
    res.status(200).json(doc);
  });
};

module.exports.studentGetOne = function (req, res) {
  const studentId = req.params.gameId;
  Game.findById(studentId).exec(function (err, student) {
    console.log("Found Student", student);
    res.status(200).json(student);
  });
};
