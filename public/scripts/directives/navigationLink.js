angular.module("app")
    .directive("navigationLink", function() {
       return {
           templateUrl: "/views/common/navigation_link.html",
           scope: {item: "=navigationLink"},
           link: function(scope) {

           }
       }
    });