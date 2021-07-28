const mongoose = require("mongoose");
const Swimmer = mongoose.model("Swimmer");

module.exports.GetOneMember = function (req, res) {
  console.log("GetOneMember");
  const swimID = req.params.swimId;
  Swimmer.findById(swimID)
    .select("swimmer")
    .exec(function (err, swim) {
      const response = {
        status: 200,
        message: swim,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!swim) {
        response.status = 404;
        response.message = { message: "swim not found" };
      } else {
        response.message = swim.swimmer;
      }
      res.status(200).json(swim.swimmer);
    });
};

module.exports.createMember = function (req, res) {
  console.log("creating Member");

  Swimmer.findById(req.params.swimId)
    .select("swimmer")
    .exec(function (err, doc) {
      const response = {
        status: 200,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = {
          "message:": "Your requested unavailable resource",
        };
      }

      if (response.status !== 200) {
        res.status(response.status).json(response.message);
        return;
      }

      console.log("Document " + doc);

      addSwimmerToTeam(doc, req, res);
    });
};
function addSwimmerToTeam(team, req, res) {
  console.log("adding publisher", req.body);

  //team.Swimmer = {};
  const newMember = {
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
  };

  if (!team.swimmer) {
    team.swimmer = [];
  }
  team.swimmer.push(newMember);
  team.save(function (err, updated) {
    const response = {
      status: 500,
      message: err,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (updated) {
      response.status = 201;
      response.message = updated.swimmer;
    }
    res.status(response.status).json(response.message);
  });
}
module.exports.memberFUllUpdateOne = function (req, res) {
  const swimID = req.params.swimId;
  Swimmer.findByIdAndUpdate(swimID, {
    Swimmer: {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
    },
  }).exec(function (err, swim) {
    console.log("Found swim ", !swim);
    if (err) {
      console.log("error :", err);
      res.status(500).json(err);
      return;
    } else if (!swim) {
      console.log("no swim");
      res.status(404).json({ message: "swimId not found" });
      return;
    }

    if (swim) {
      swim.swimmer.name = req.body.name;
      swim.save(function (err, updatedSwim) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(204).json(updatedSwim.swimmer);
        }
      });
    }
  });
};
module.exports.partialUpdateSwimmer = function (req, res) {
  console.log("performing patch update for swim :" + req.params.swimId);

  Swimmer.findById(req.params.swimId)
    .select("swimmer")
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
        response.message = { statusMessage: "swim not found!" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
        return;
      }
      patchUpdateSwimmer(doc, req, res);
    });
};
function patchUpdateSwimmer(swim, req, res) {
  if (req.body.name) {
    swim.swimmer.name = req.body.name;
  }

  if (req.body.age) {
    swim.swimmer.age = req.body.age;
  }
  if (req.body.gender) {
    swim.swimmer.gender = req.body.gender;
  }

  game.save(function (err, updatedswim) {
    const response = {
      status: 204,
      message: updatedswim.swimmer,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
}
module.exports.DeleteOne = function (req, res) {
  const swimID = req.params.swimId;

  Swimmer.findById(swimID).exec(function (err, swim) {
    console.log("Found swim ", swim);
    if (err) {
      res.status(500).json(err);
    } else if (!swim) {
      res.status(404).json({ message: "swimId not found" });
    }

    if (swim) {
      swim.swimmer.remove();
      swim.save(function (err, updatedSwim) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(204).json(updatedSwim.swimmer);
        }
      });
    }
  });
};
