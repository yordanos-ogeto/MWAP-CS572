angular.module("myApp").controller("JobDisplayController", jobController);

function jobController(JobDataFactory, $routeParams) {
  const vm = this;
  JobDataFactory.getOneJob($routeParams.id).then(function (response) {
    vm.jobs = response;
  });
}
