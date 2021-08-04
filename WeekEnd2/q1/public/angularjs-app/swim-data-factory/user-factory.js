angular.module("swimmerClub").factory("UserFactory", userFactory);

function userFactory($http) {
  function complete(response) {
    return response;
  }

  function failure(err) {
    return err;
  }

  function registerUser(user) {
    return $http.post("/api/users", user).then(complete).catch(failure);
  }

  function login(credentials) {
    return $http.post("/api/login", credentials).then(complete).catch(failure);
  }

  return {
    register: registerUser,
    login: login,
  };
}
