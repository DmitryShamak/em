angular.module("app")
	.controller("LandingCtrl", function($rootScope, $scope, $interval, $state, $filter, api) {
		var dateNow = moment().toDate();

		$scope.pageParams = {};
		$scope.page = {};

		$scope.init = function() {
			$scope.pageParams.busy = true;
			$scope.pageParams.offline = false;

			$scope.page.updates = [];
			for(var i=0; i<5; i++) {
				var imageInd = Math.floor(Math.random()*5);
				$scope.page.updates.push({
					title: "Lorem ipsum dolor sit",
					date: moment().toDate(),
					content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor, est at accumsan lacinia, ex metus pellentesque eros," +
					"malesuada tempus dui leo non velit. Quisque volutpat nisl sit amet justo blandit, quis accumsan ipsum sodales. Morbi vitae nunc " +
					"mattis, vestibulum justo vel, euismod augue. Nulla facilisi. In pellentesque vehicula ex, in semper mi.",
					style: {
						'backgroundImage': 'url(/public/imgs/default_img_'+imageInd+'.jpg)'
					}
				});
			}

			$scope.pageParams.busy = false;
			$scope.pageParams.offline = false;
		};

		$scope.$watch("user", $scope.init);
	});
