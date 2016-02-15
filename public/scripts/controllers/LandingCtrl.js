angular.module("app")
	.controller("LandingCtrl", function($rootScope, $scope, $interval, $state, api) {
		if(!$rootScope.user && !$rootScope.busy) {
	      $state.go("login");
	    }

		$scope.pageParams = {};

		$scope.init = function() {
			$scope.pageParams.busy = true;
			$scope.pageParams.offline = false;
			if(!$scope.user) {
				return;
			}

			api.user.get({
				name: $scope.user.name
			}, function(user) {
				$scope.userHistory = user.history;
				$scope.pageParams.busy = false;
			}, function(error) {
				$scope.pageParams.busy = false;
				$scope.pageParams.offline = true;
			})
		};

		$scope.$watch("user", $scope.init);
	});
