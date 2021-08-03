// const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");
const Swimmer = mongoose.model("Swimmer");
module.exports.getAllTeam = function (req, res) {
  console.log("Get the team");

  let offset = 0;
  let count = 5;
  let maxCount = 10;
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (count > maxCount) {
    res.status(400).json({ message: "Cannot exceed count of " + maxCount });
    return;
  }
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(404)
      .json({ message: "Querystring offset and count should be numbers" });
  }
  Swimmer.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, swim) {
      const response = {
        status: 200,
        message: swim,
      };
      if (err) {
        console.log("Error finding swim", err);
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
};
module.exports.getOneTeam = function (req, res) {
  const swimID = req.params.swimId;
  Swimmer.findById(swimID).exec(function (err, swim) {
    const response = {
      status: 200,
      message: swim,
    };
    if (err) {
      console.log("Error finding swim");
      response.status = 200;
      response.message = err;
    } else if (!swim) {
      response.status = 400;
      response.message = { message: "swim id not found" };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.addOneSwimTeam = function (req, res) {
  console.log("post new swim");
  console.log("req.body");
  const newSwimmer = {
    teamName: req.body.teamName,
    score: parseInt(req.body.score),
    year: parseInt(req.body.year),
    rank: parseInt(req.body.rank),
    swimmer: {},
  };
  Swimmer.create(newSwimmer, function (err, swim) {
    const response = {
      status: 201,
      message: swim,
    };
    res.status(response.status).json(response.message);
  });
};
module.exports.fullyUpdateSwimmer = function (req, res) {
  console.log("fully update requiest recieved");
  const swimmID = req.params.swimId;
  Swimmer.findById(swimmID).exec(function (err, swim) {
    const response = {
      status: 204,
      message: swim,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!swim) {
      response.status = 404;
      response.message = { message: "swimTeam id not found" };
    } else {
      swim.teamName = req.body.teamName;
      swim.year = parseInt(req.body.year);
      swim.score = parseInt(req.body.score);
      swim.rank = parseInt(req.body.rank);
      swim.swimmer = {};
      swim.save(function (err, updateSwim) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updateSwim;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};
module.exports.partialUpdateSwim = function (req, res) {
  console.log("partial update swimerTeam requiest recieved");
  const swimID = req.params.swimId;
  Swimmer.findById(swimID).exec(function (err, swim) {
    const response = {
      status: 204,
      message: swim,
    };

    if (err) {
      console.log("Error finding swim");
      response.status = 500;
      response.message = err;
    } else if (!swim) {
      response.status = 404;
      response.message = { message: "swim ID not found" };
    }

    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      //This is where update happens
      if (req.body.teamName) {
        swim.teamName = req.body.teamName;
      }

      if (req.body.year) {
        swim.year = parseFloat(req.body.year);
      }

      if (req.body.score) {
        swim.score = parseInt(req.body.score);
      }

      if (req.body.rank) {
        swim.rank = parseInt(req.body.rank);
      }
      swim.save(function (err, updatedSwim) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedSwim;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.DeleteOne = function (req, res) {
  const swimID = req.params.swimId;
  Swimmer.findByIdAndRemove(swimID).exec(function (err, deletedTeam) {
    const response = {
      status: 204,
      message: deletedTeam,
    };

    if (err) {
      console.log("Error finding swim");
      response.status = 500;
      response.message = err;
    } else if (!deletedTeam) {
      response.status = 404;
      response.message = { message: "swim ID not found" };
    }

    res.status(response.status).json(response.message);
  });
};
