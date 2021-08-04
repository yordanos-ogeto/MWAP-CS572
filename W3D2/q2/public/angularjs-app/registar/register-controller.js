angular
  .module("meanGames")
  .controller("RegisterController", registercontroller);

function registercontroller(UserFactory) {
  const vm = this;
  vm.formdata = {};
  vm.register = function () {
    console.log(vm.formdata);
    if (vm.formdata.repeatpass !== vm.formdata.password) {
      console.log("password not match");
      vm.err = "password must match";
    } else {
      vm.err = "";
      UserFactory.register(vm.formdata)
        .then(function (response) {
          console.log(response.data);
          vm.success = "Registerd successfully!";
        })
        .catch(function (err) {
          vm.err = "failed to register";
          vm.success = "";
        });
    }
  };
}
