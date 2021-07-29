angular
  .module("meanGames")
  .controller("GameDisplayEditController", gamesDisplay);
function gamesDisplay(GamesFactory, $routeParams, $route) {
  const vm = this;
  vm.formGame = {};
  GamesFactory.getOneGame($routeParams.id).then(function (response) {
    //console.log(response.data);
    vm.formGame = response;
  });
  vm.edit = function () {
    console.log(vm.formGame);
    GamesFactory.editGame($routeParams.id, vm.formGame).then(function (
      response
    ) {
      $route.reload();
    });
  };
}
