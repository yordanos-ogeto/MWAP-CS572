angular.module("swimmerClub").factory("SwimFactory", SwimsFactory);
function SwimsFactory($http) {
  return {
    getAllSwimersClub: getAll,
    getOneSwimmerClub: getOne,
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
  function complete(response) {
    return response;
  }
  function failur(error) {
    return error;
  }
}
