angular.module("swimmerClub").factory("AuthFactory", authFactory);

function authFactory() {
  let auth = false;

  return {
    authenticated: auth,
  };
}
