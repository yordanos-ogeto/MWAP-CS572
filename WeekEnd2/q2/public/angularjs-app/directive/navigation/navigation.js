angular.module("meanGames").directive("gamesNavigation", gamesNavigation);

function gamesNavigation() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/directive/navigation/navigation-directive.html",
  };
}
