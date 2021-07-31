angular.module("myApp").factory("JobDataFactory", jobfactory);

function jobfactory($http) {
  return {
    getAllJobs: getAll,
    getOneJob: getJob,
    addOneJob: addOne,
    deleteOneJob: deleteOne,
    updateOneJob: updateOne,
  };

  function getAll() {
    return $http.get("api/jobs").then(complete).catch(failed);
  }
  function getJob(id) {
    return $http
      .get("api/jobs/" + id)
      .then(complete)
      .catch(failed);
  }
  function addOne(job) {
    return $http.get("api/jobs/", job).then(complete).catch(failed);
  }

  function deleteOne(id) {
    return $http
      .delete("api/jobs/" + id)
      .then(complete)
      .catch(failed);
  }
  function updateOne(id, job) {
    return $http
      .get("api/jobs/" + id, job)
      .then(complete)
      .catch(failed);
  }
  function complete(response) {
    return response.data;
  }
  function failed(response) {
    return response.status.statusText;
  }
}
