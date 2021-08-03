angular.module("swimmerClub").factory("SwimFactory", SwimsFactory);
function SwimsFactory($http) {
  return {
    getAllSwimersClub: getAll,
    getOneSwimmerClub: getOne,
    AddOneClub: addOneClub,
    deleteClub: deleteOneClub,
    updateClub: updateOne,
  };
  function getAll() {
    return $http.get("/api/swimmerTeam").then(complete).catch(failur);
  }

  function getOne(swimId) {
    return $http
      .get("/api/swimmerTeam/" + swimId)
      .then(complete)
      .catch(failur);
  }
  function addOneClub(swim) {
    return $http.post("/api/swimmerTeam/", swim).then(complete).catch(failur);
  }

  function deleteOneClub(id) {
    return $http
      .delete("/api/swimmerTeam/" + id)
      .then(complete)
      .catch(failur);
  }

  function updateOne(id, swim) {
    return $http
      .put("/api/swimmerTeam/" + id, swim)
      .then(complete)
      .catch(failur);
  }
  function complete(response) {
    return response;
  }
  function failur(error) {
    return error;
  }
}
