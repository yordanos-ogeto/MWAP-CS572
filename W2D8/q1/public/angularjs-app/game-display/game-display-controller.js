angular
  .module("meanGames")
  .controller("GamesDisplayController", GameController);
function GameController(GamesFactory, $routeParams) {
  const vm = this;
  const gameId = $routeParams.id;
  function _getStarsArray(stars) {
    return new Array(stars);
  }
  GamesFactory.getOneGame(gameId).then(function (game) {
    vm.game = game;
    console.log(game);
    vm.rating = _getStarsArray(game.rate);
    console.log(vm.rating);
  });
}
