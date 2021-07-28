angular.module("meanGames").factory("GamesFactory", GamesFactory);
function GamesFactory($http) {
  return {
    getAllGames: getAll,
    getOneGame: getOne,
  };
  function getAll() {
    return $http.get("/api/games").then(complete).catch(failur);
  }

  function getOne(gameId) {
    return $http
      .get("/api/games/" + gameId)
      .then(complete)
      .catch(failur);
  }
  function complete(response) {
    return response.data;
  }
  function failur(error) {
    return error;
  }
}
