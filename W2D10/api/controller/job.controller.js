const mongoose = require("mongoose");
const Job = mongoose.model("job");

module.exports.getAllJobs = function (req, res) {
  console.log("All Jobs");

  let offset = 0;
  let count = 5;
  let maxCount = 7;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);

    if (isNaN(offset) || isNaN(count)) {
      res.status(500).json({ message: "invalid query string" });
    }
    if (count > maxCount) {
      req.status(400).json({ message: "Maximum count exceeded" });
    }
    console.log(offset);
    console.log(count);
  }
  Job.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, joblists) {
      //console.log("job list ", joblists);
      if (err) {
        console.log("error finding Jobs");
        res.status(500).send(err);
        return;
      } else {
        res.status(200).json(joblists);
      }
    });
};

module.exports.getOne = function (req, res) {
  console.log("Get one");
  const jobId = req.params.id;

  Job.findById(jobId).exec(function (err, job) {
    const response = {
      status: 200,
      message: job,
    };
    if (err) {
      console.log("Error found");
      response.status = 500;
      response.message = "Error found";
    }
    if (!job) {
      response.status = 404;
      response.message = "Job id is not found";
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.addJob = function (req, res) {
  console.log("Creating a new jobs with properties", req.body);
  const newJob = {
    title: req.body.title,
    salary: parseFloat(req.body.salary),
    experience: req.body.experience,
    description: req.body.description,
    postDate: req.body.postDate,
    skill: req.body.skill,
    location: {},
  };
  //  console.log("exp : ", req.body.experience);
  console.log(newJob);
  Job.create(newJob, function (err, job) {
    const response = {
      status: 201,
      message: job,
    };
    if (err) {
      console.log("Error during creating job");
      response.status = 500;
      response.message = err;
      console.log(err);
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.fullUpdate = function (req, res) {
  console.log("Fully updated");
  const jobsId = req.params.id;
  Job.findById(jobsId).exec(function (err, ajob) {
    const response = {
      status: 204,
      message: ajob,
    };
    if (err) {
      response.status = 500;
      response.message = "Error finding Job";
    }
    if (!ajob) {
      response.status = 404;
      response.message = "Job id not found";
    }
    if (response.status != 204) {
      res.status(response.status).json(response.message);
    } else {
      ajob.title = req.body.title;
      ajob.salary = parseFloat(req.body.salary);
      ajob.experience = req.body.experience;
      ajob.skill = req.body.skill;
      ajob.postDate = req.body.postDate;
    }
    ajob.save(function (err, updatedJob) {
      if (err) {
        response.status = 500;
        response.message = "Error updating Job";
      } else {
        console.log("Updated job ", updatedJob);
        response.message = updatedJob;
      }
      res.status(response.status).json(response.message);
    });
  });
};

module.exports.partialUpdate = function (req, res) {
  console.log("partially updated");
  const jobId = req.params.id;
  Job.findById(jobId).exec(function (err, ajob) {
    const response = {
      status: 204,
      message: ajob,
    };
    if (err) {
      console.log("Error finding job");
      response.status = 500;
      response.message = err;
    } else if (!ajob) {
      response.status = 400;
      response.message = { message: "job id not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      if (req.body.title) {
        ajob.title = req.body.title;
      }
      if (req.body.price) {
        ajob.price = parseFloat(req.body.price);
      }
      if (req.body.description) {
        ajob.description = req.body.description;
      }
      if (req.body.experience) {
        ajob.experience = parseInt(req.body.experience);
      }
      if (req.body.skill) {
        ajob.skill = req.body.skill;
      }
      if (req.body.postDate) {
        ajob.postDate = req.body.postDate;
      }
      ajob.save(function (err, updatedJobs) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedJobs;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.deleteById = function (req, res) {
  console.log("job deleted");
  const jobId = req.params.id;

  Job.findByIdAndRemove(jobId).exec(function (err, deleteJob) {
    const response = {
      status: 204,
      message: deleteJob,
    };
    if (err) {
      console.log("Error finding job");
      response.status = 500;
      response.message = err;
    } else if (!deleteJob) {
      response.status = 404;
      response.message = { message: "job ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};
