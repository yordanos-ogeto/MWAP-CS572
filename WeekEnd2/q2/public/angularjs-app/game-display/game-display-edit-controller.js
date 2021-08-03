angular
  .module("meanGames")
  .controller("GamesDisplayEditController", gamesDisplay);

function gamesDisplay(GameFactory, $routeParams, $route) {
  const vm = this;
  vm.gameData = {};

  GameFactory.getOne($routeParams.id).then(function (response) {
    console.log(response.data);

    vm.gameData = response.data;
  });

  vm.edit = function () {
    console.log(vm.gameData);
    GameFactory.updateGame($routeParams.id, vm.gameData).then(function (
      response
    ) {
      $route.reload();
    });
  };
}
