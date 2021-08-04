angular.module("swimmerClub").directive("swimmerNavigation", swimmerNavigation);

function swimmerNavigation() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/directive/navigator/navigation.html",
  };
}
