angular.module("app")
	.controller("LandingCtrl", function($rootScope, $scope, $interval, $state, api) {
		if(!$rootScope.user && !$rootScope.busy) {
	      $state.go("login");
	    }

		var dateNow = moment().toDate();

		$scope.pageParams = {};
		$scope.pageData = {};

		$scope.initStats = function(stats) {
			$scope.pageData.stats = [];
			$scope.pageData.stats.push({
				priority: 0,
				data: {
					count: 0,
					title: "News",
					date: dateNow
				}
			});
			$scope.pageData.stats.push({
				priority: 1,
				data: {
					count: 0,
					title: "Events",
					date: dateNow
				}
			});
			$scope.pageData.stats.push({
				priority: 2,
				data: {
					count: 0,
					title: "Messages",
					date: dateNow
				}
			});
			$scope.pageData.stats.push({
				priority: 3,
				data: {
					count: 0,
					title: "Notifications",
					date: dateNow
				}
			});
		};

		$scope.init = function() {
			$scope.pageParams.busy = true;
			$scope.pageParams.offline = false;
			if(!$scope.user) {
				return;
			}

			$scope.initStats({});

			api.user.get({
				name: $scope.user.name
			}, function(user) {
				$scope.pageParams.busy = false;
			}, function(error) {
				$scope.pageParams.busy = false;
				$scope.pageParams.offline = true;
			})
		};

		$scope.$watch("user", $scope.init);
	});
