angular
  .module("swimmerClub", ["ngRoute", "angular-jwt"])
  .config(config)
  .run(run);
function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/welcome/welcome.html",
    })
    .when("/swimmerTeam", {
      templateUrl: "angularjs-app/swim-list/swim-list.html",
      controller: "SwimmersController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/swimmerTeam/:id", {
      templateUrl: "angularjs-app/swim-display/swim-display.html",
      controller: "SwimmerDisplayController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/register", {
      templateUrl: "angularjs-app/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/swimmerTeam/:id/edit", {
      templateUrl: "angularjs-app/swim-display/swim-display-edit.html",
      controller: "SwimDisplayEditController",
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
