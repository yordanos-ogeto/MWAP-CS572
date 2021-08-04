angular
  .module("swimmerClub")
  .controller("SwimDisplayEditController", SwimDisplayController);

function SwimDisplayController(SwimFactory, $routeParams, $route) {
  const vm = this;
  vm.swimData = {};

  SwimFactory.getOneSwimmerClub($routeParams.id).then(function (response) {
    console.log(response.data);

    vm.swimData = response;
  });

  vm.edit = function () {
    console.log(vm.swimData);
    SwimFactory.updateClub($routeParams.id, vm.swimData).then(function (
      response
    ) {
      $route.reload();
    });
  };
}
