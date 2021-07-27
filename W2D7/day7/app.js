angular.module("AdviceSlip", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "main/main.html",
      controller: "MainController",
      controllerAs: "mainCtrl",
    })
    .when("/advice/:adviceId", {
      templateUrl: "qoute/advice.html",
      controller: "AdviceSlipController",
      controllerAs: "adviceCtrl",
    })
    .otherwise({
      redirectTo: "/",
    });
}
