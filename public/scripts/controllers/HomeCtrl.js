angular.module("app")
	.controller("HomeCtrl", function($rootScope, $scope, $interval, $state, api) {
		if(!$rootScope.user && !$rootScope.busy) {
	      $scope.redirectToMainPage();
	    }

		var dateNow = moment().toDate();
		var Statistic = function(attrs, busy) {
			var self = this;

			self.busy = busy;
			self.priority = attrs.priority;
			self.type = attrs.type;
			self.data = {
				count: 0,
				title: attrs.type.toUpperCase(),
				date: attrs.date || dateNow
			};
		};

		$scope.pageParams = {};
		$scope.page = {};

		$scope.initStats = function(stats) {
			$scope.page.stats = [];
			$scope.page.stats.push(new Statistic({
				priority: 0,
				type: "news"
			}, true));
			$scope.page.stats.push(new Statistic({
				priority: 0,
				type: "events"
			}, true));
			//$scope.pageData.stats.push({
			//	priority: 2,
			//	type: "",
			//	data: {
			//		count: 0,
			//		title: "Messages",
			//		date: dateNow
			//	}
			//});
			$scope.page.stats.push(new Statistic({
				priority: 0,
				type: "notifications"
			}, true));
		};

		$scope.init = function() {
			$scope.pageParams.busy = true;
			$scope.pageParams.offline = false;
			if(!$scope.user) {
				return;
			}

			$scope.initStats({});
			//News block
			var news = _.find($scope.page.stats, {type: "news"});
			api.scraper.save({
				providers: ["onliner"]
			}, function(data) {
				news.data.count = data.onliner.totalCount;
				news.busy = false;
			}, function(err) {
				console.info(err);
				news.busy = false;
			});

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
