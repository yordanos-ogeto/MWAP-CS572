angular.module("myApp").controller("JobDisplayEditController", jobController);

function jobController(JobDataFactory, $routeParams, $route) {
  const vm = this;
  vm.jobData = {};

  JobDataFactory.getOneJob($routeParams.id).then(function (response) {
    vm.jobData = response;
  });

  vm.edit = function () {
    JobDataFactory.updateOneJob($routeParams.id, vm.jobData).then(function (
      response
    ) {
      console.log(response);
      $route.reload();
    });
  };
}
