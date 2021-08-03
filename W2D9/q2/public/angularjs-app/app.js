angular.module("meanGames", ["ngRoute"]).config(config);
function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/game-list/game-list.html",
      controller: "GamesController",
      controllerAs: "vm",
    })
    .when("/games/:id", {
      templateUrl: "angularjs-app/game-display/game-display.html",
      controller: "gamesDisplayController",
      controllerAs: "vm",
    })
    .when("/games/:id/edit", {
      templateUrl: "angularjs-app/game-display/game-display-edit.html",
      controller: "GameDisplayEditController",
      controllerAs: "vm",
    })
    .otherwise({
      redirectTo: "/",
    });
}
