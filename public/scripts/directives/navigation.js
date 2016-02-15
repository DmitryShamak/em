angular.module("app")
	.directive("navigation", function() {
		return {
			templateUrl: "/views/navigation.html",
			controller: "NavigationCtrl",
			replace: true
		}
	})