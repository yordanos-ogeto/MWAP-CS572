angular.module("swimmerClub").controller("LoginController", LoginController);

function LoginController(
  UserFactory,
  $window,
  AuthFactory,
  jwtHelper,
  $location
) {
  const vm = this;

  vm.isLoggedIn = function () {
    return AuthFactory.authenticated;
  };

  vm.login = function () {
    vm.credentials = {
      username: vm.username,
      password: vm.password,
    };
    console.log("login called", vm.credentials);
    UserFactory.login(vm.credentials).then(function (result) {
      console.log("result", result);

      if (result.status == 200) {
        $window.sessionStorage.token = result.data;
        AuthFactory.authenticated = true;
        const decoded = jwtHelper.decodeToken(result.data);
        console.log(decoded, decoded.payload);
        vm.loggedinUser = decoded.payload;
        $location.path("/");
      } else {
        console.log("failed to login");
      }
    });
  };

  vm.logout = function () {
    AuthFactory.authenticated = false;
    delete $window.sessionStorage.token;
    $location.path("/");
  };
}
