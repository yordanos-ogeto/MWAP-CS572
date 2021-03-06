angular.module("swimmerClub").controller("SwimmersController", SwimController);
function SwimController(SwimFactory) {
  const vm = this;
  vm.teamName = "Swimmer Club";
  SwimFactory.getAllSwimersClub().then(function (response) {
    console.log(response);
    vm.swims = response.data;
  });
}
