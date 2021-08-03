angular.module("meanGames").directive("gamesFooter", gamesFooter);

function gamesFooter() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/directive/footer/footer.html",
  };
}
