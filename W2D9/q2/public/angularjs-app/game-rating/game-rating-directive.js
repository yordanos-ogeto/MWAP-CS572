angular.module("meanGames").directive("gameRating", GameRating);
function GameRating() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/game-rating/rating.html",
    bindToController: true,
    controller: "GamesDisplayController",
    controllerAs: "rateCtr",
  };
}
