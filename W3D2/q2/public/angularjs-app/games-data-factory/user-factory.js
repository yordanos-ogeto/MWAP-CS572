angular.module("meanGames").factory("UserFactory", userFactory);

function userFactory($http) {
  function registerUser(user) {
    return $http.post("/api/users", user).then(complete).catch(failure);
  }
  function login(credential) {
    return $http.post("/api/login", credential).then(complete).catch(failure);
  }
  function complete(response) {
    return response;
  }
  function failure(err) {
    return err;
  }
  return {
    register: registerUser,
    login: login,
  };
}
