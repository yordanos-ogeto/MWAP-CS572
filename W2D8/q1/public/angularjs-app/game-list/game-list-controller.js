angular.module("meanGames").controller("GamesController", GameController);
function GameController(GamesFactory) {
  const vm = this;
  vm.title = "meanGames";
  GamesFactory.getAllGames().then(function (response) {
    console.log(response);
    vm.games = response;
  });
}
