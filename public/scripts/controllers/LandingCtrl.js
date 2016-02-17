angular.module("app")
	.controller("LandingCtrl", function($rootScope, $scope, $interval, $state, api) {
		var dateNow = moment().toDate();

		$scope.pageParams = {};
		$scope.pageData = {};

		$scope.init = function() {
			//$scope.pageParams.busy = true;
			//$scope.pageParams.offline = false;
			//if(!$scope.user) {
			//	return;
			//}
		};

		$scope.$watch("user", $scope.init);
	});
