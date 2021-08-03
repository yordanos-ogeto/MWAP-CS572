angular.module("myApp").controller("JobDataControll", dataControll);

function dataControll(JobDataFactory, $route) {
  const vm = this;
  JobDataFactory.getAllJobs().then(function (response) {
    console.log("response ", response);
    vm.jobs = response;
    console.log("jobs ,", vm.jobs);
  });
  vm.jobData = {};
  vm.addOne = function () {
    console.log("add here");
    console.log(vm.jobData);
    JobDataFactory.addOneJob(vm.jobData).then(function (response) {
      $route.reload();
    });
  };
  vm.delete = function (id) {
    JobDataFactory.deleteOneJob(id).then(function (response) {
      $route.reload();
    });
  };
}
