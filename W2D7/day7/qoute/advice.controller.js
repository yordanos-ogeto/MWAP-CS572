angular
  .module("AdviceSlip")
  .controller("AdviceSlipController", AdviceSlipController);

function AdviceSlipController(DataFactory) {
  const vm = this;

  DataFactory.getOne().then(function (response) {
    console.log(response);
    vm.advices = response.slip;
  });
}
