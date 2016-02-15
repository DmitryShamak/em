angular.module("app")
	.controller("SignUpCtrl", function($rootScope, $scope, $state, api) {
		$scope.userData = {};

		$scope.signIn = function(userData) {
			if($scope.busy) {
				return;
			}

			$scope.invalid = false;
			$scope.busy = true;
			//check data validation
			api.user.save({
				name: userData.name,
				password: userData.password
			}, function(response) {
				//set cookie
				document.cookie = response.token;
				$rootScope.user = {name: userData.name};
				//set data to db
				$state.go("landing");
			}, function(error) {
				console.log(error);
				$scope.invalid = true;
				$scope.busy = false;
			});
		};
	});