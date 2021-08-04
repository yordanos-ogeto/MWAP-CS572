angular.module("swimmerClub").directive("swimmerFooter", swimmersFooter);

function swimmersFooter() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/directive/footer/footer.html",
  };
}
