angular.module("app")
	.controller("LogInCtrl", function($rootScope, $scope, $state, $window, api) {
		$scope.sources = [{
			name: "Google+",
			key: "google"
		}, {
			name: "Instagram",
			key: "instagram"
		}, {
			name: "Facebook",
			key: "facebook"
		}];

		$scope.authWith = function(source) {
			var path = "/auth/" + source;
			$window.location.href = path;
		};
		
		$scope.logIn = function(userData) {
			if($scope.busy) {
				return;
			}

			if(!userData.name || !userData.password) {
				return $scope.invalid = true;
			}
			$scope.invalid = false;
			$scope.busy = true;

			api.login.save(userData, function(response) {
				$scope.busy = false;
				//set cookies
				document.cookie = response.token;
				$rootScope.user = {name: response.name};
				$state.go("landing");
			}, function(error) {
				console.log(error);
				userData.password = null;
				$scope.invalid = true;
				$scope.busy = false;
			});
		};
	});