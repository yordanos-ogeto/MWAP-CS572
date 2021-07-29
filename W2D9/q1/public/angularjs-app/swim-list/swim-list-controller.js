angular.module("swimmerClub").controller("SwimmersController", SwimController);
function SwimController(SwimFactory) {
  const vm = this;
  vm.teamName = "Swimmer Club";
  SwimFactory.getAllSwimersClub().then(function (response) {
    console.log(response);
    vm.swims = response.data;
  });
  vm.swimData = {};
  vm.AddClub = function () {
    SwimFactory.AddOneClub(swimCtrl.swimData).then(function (response) {
      $route.reload();
    });
  };

  vm.delete = function (id) {
    SwimFactory.deleteClub(id).then(function (response) {
      $route.reload();
    });
  };
}
