angular.module("meanGames").factory("GamesFactory", GamesFactory);
function GamesFactory($http) {
  return {
    getAllGames: getAll,
    getOneGame: getOne,
    addOneGame: addOne,
    deleteGame: deleteOne,
    editGame: edit,
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
  function addOne(bodyGame) {
    return $http.post("/api/games/", bodyGame).then(complete).catch(failur);
  }
  function deleteOne(id) {
    return $http
      .delete("/api/games/" + id)
      .then(complete)
      .catch(failur);
  }
  function edit(id) {
    return $http
      .put("/api/games/" + id, game)
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
