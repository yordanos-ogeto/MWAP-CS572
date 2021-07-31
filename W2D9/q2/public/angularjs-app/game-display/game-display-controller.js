angular.module("meanGames").controller("gamesDisplayController", gameDisplay);
function gameDisplay(GamesFactory, $routeParams) {
  const vm = this;
  const gameId = $routeParams.id;

  GamesFactory.getOneGame(gameId).then(function (game) {
    vm.game = game;
    console.log(game);
    vm.rate = new Array(game.rate);
    console.log(vm.rate);
  });
}
