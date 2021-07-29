angular
  .module("swimmerClub")
  .controller("SwimmerDisplayController", SwimController);
function SwimController(SwimFactory, $routeParams) {
  const vm = this;
  const swimId = $routeParams.id;

  SwimFactory.getOneSwimmerClub(swimId).then(function (swim) {
    vm.swim = swim.data;
  });
}
