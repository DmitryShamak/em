angular.module("app")
	.controller("NavigationCtrl", function($scope, $window) {
		$scope.updateNotificationCount = function() {
			$scope.notificationsCount = 0;
		};
		$scope.sources = [{
			name: "Google+",
			key: "google"
		}];

		$scope.authWith = function(source) {
			var path = "/auth/" + source;
			$window.location.href = path;
		};

		$scope.navigation = {};
		var topLinks = {};
		topLinks.landing = {
			title: "Landing",
			state: "landing",
			icon: "fa-info"
		};
		topLinks.home = {
			title: "Home",
				state: "home",
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

		//todo: add contacts page
		bottomLinks.landing = {
			title: "Landing",
			actstate: "landing",
			icon: "fa-sign-out"
		};
		if($scope.user) {
			bottomLinks.logout = {
				title: "Log Out",
				action: $scope.logout,
				icon: "fa-sign-out"
			};
		} else {
			_.forEach($scope.sources, function(source) {
				bottomLinks[source.name] = {
					title: "Sign In with " + source.name,
					action: function() {
						$scope.authWith(source.key);
					},
					icon: "fa-" + source.key
				};
			});
		}
		$scope.navigation.bottomLinks = bottomLinks;

		//update history link
	});