angular.module("AdviceSlip").controller("MainController", mainController);

function mainController(DataFactory) {
  const vm = this;

  DataFactory.getAll().then(function (response) {
    console.log(response);
    vm.advices = response.slip;
  });
}
