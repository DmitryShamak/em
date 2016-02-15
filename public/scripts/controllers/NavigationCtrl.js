angular.module("app")
	.controller("NavigationCtrl", function($scope) {
		$scope.updateNotificationCount = function() {
			$scope.notificationsCount = 0;
		};

		$scope.navigation = {};
		var topLinks = {};
		topLinks.landing = {
			title: "Home",
				state: "landing",
				icon: "fa-home",
				value: $scope.notificationsCount || 0
		};
		topLinks.sources = {
			title: "Map",
			state: "map",
			icon: "fa-map-marker",
			value: $scope.mewMarkers || 0
		};

		$scope.navigation.topLinks = topLinks;

		var bottomLinks = {};

		bottomLinks.logout = {
			title: "Log Out",
			state: "logout",
			icon: "fa-sign-out"
		};
		$scope.navigation.bottomLinks = bottomLinks;

		//update history link
	});