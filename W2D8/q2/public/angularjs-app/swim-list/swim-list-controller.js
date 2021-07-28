angular.module("swimmerClub").controller("SwimmersController", SwimController);
function SwimController(SwimFactory) {
  const vm = this;
  vm.teamName = "swimmerClub";
  SwimFactory.getAllSwimersClub().then(function (response) {
    console.log(response);
    vm.swims = response;
  });
}
