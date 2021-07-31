angular.module("myApp", ["ngRoute"]).config(config);
function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/job-list/job-list.html",
      controller: "JobDataControll",
      controllerAs: "vm",
    })
    .when("/jobs/:id", {
      templateUrl: "angular-app/job-display/job-display.html",
      controller: "JobDisplayController",
      controllerAs: "vm",
    })
    .when("/jobs/:id/edit", {
      templateUrl: "angular-app/job-display/job-display-edit.html",
      controller: "JobDisplayEditController",
      controllerAs: "vm",
    });
}
