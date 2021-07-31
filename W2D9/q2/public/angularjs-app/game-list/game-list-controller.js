angular.module("meanGames").controller("GamesController", GameController);
function GameController(GamesFactory) {
  const vm = this;
  vm.title = "meanGames";
  GamesFactory.getAllGames().then(function (response) {
    console.log(response);
    vm.games = response;
  });
  vm.formGame = {}; //this will be populated by template UI
  vm.addGame = function () {
    if (vm.gameForm.$valid) {
      console.log("vm.formGame", vm.formGame);
      GamesFactory.addOneGame(vm.formGame);
    }
  };
  vm.remove = function (id) {
    console.log("delete", id);
    GamesFactory.deleteGame(id);
  };
}
