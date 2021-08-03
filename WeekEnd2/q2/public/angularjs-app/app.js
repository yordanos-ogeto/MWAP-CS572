angular.module("meanGames", ["ngRoute", "angular-jwt"]).config(config).run(run);
function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/welcome/welcome.html",
    })
    .when("/games", {
      templateUrl: "angularjs-app/game-list/game-list.html",
      controller: "GamesController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/games/:id", {
      templateUrl: "angularjs-app/game-display/game-display.html",
      controller: "gamesDisplayController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/register", {
      templateUrl: "angularjs-app/registar/registor.html",
      controller: "RegisterController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/games/:id/edit", {
      templateUrl: "angularjs-app/game-display/game-display-edit.html",
      controller: "GamesDisplayEditController",
      controllerAs: "vm",
      access: { restricted: true },
    })
    .when("/profile", {
      templateUrl: "angularjs-app/profile/profile.html",
      controller: "ProfileController",
      controllerAs: "vm",
      access: { restricted: true },
    })
    .otherwise({
      redirectTo: "/",
    });
}
function run($rootScope, $location, AuthFactory, $window) {
  $rootScope.$on(
    "$routeChangeStart",
    function (event, nextRoute, currentRoute) {
      if (
        nextRoute.access &&
        nextRoute.access.restricted &&
        !AuthFactory.authenticated &&
        !$window.sessionStorage.token
      ) {
        event.preventDefault();
        $location.path("/");
      }
    }
  );
}
