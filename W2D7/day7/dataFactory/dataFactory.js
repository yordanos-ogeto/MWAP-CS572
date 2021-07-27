angular.module("AdviceSlip").factory("DataFactory", dataFactory);

function dataFactory($http) {
  function getAll() {
    return $http
      .get("https://api.adviceslip.com/advice")
      .then(completed)
      .catch(failed);
  }

  function getOne() {
    return $http
      .get("https://api.adviceslip.com/advice")
      .then(completed)
      .catch(failed);
  }

  function completed(response) {
    return response.data;
  }

  function failed(error) {
    return error.statusText;
  }

  return {
    getAll: getAll,
    getOne: getOne,
  };
}
