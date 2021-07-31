angular.module("meanGames").directive("gameRatingDirective", gameRating);
function gameRating() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/game-rating/rating.html",
    bindToController: true,
    controller: "gamesDisplayController",
    controllerAs: "rateCtr",
  };
}
