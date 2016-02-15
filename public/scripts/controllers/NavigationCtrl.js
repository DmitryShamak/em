angular.module("app")
	.controller("NavigationCtrl", function($scope, scoreboardDialog) {
		$scope.createScoreboard = function() {
			scoreboardDialog.show();
		};

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
			title: "Sources",
			state: "sources",
			icon: "fa-external-link",
			value: $scope.sourcesCount || 0
		};
		topLinks.news = {
			title: "News",
			state: "news",
			icon: "fa-newspaper-o",
			value: $scope.newsCount || 0
		};

		$scope.navigation.topLinks = topLinks;

		var bottomLinks = {};
		bottomLinks.scoreboard = {
			title: "Create New Scoreboard",
			icon: "fa-plus-square",
			action: $scope.createScoreboard
		};

		bottomLinks.logout = {
			title: "Log Out",
			state: "logout",
			icon: "fa-sign-out"
		};
		$scope.navigation.bottomLinks = bottomLinks;

		//update history link
	});