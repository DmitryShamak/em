angular.module("app")
	.controller("MapCtrl", function($rootScope, $scope, $state, api) {
		if(!$rootScope.user && !$rootScope.busy) {
			$scope.redirectToMainPage();
		}

		$scope.pageParams = {};
		$scope.pageData = {};

		$scope.initMap = function(pos) {
			var customMapType = new google.maps.StyledMapType([
				{
					stylers: [
						{hue: '#0077ff'},
						{visibility: 'simplified'},
						{gamma: 0.5},
						{saturation: -90},
						{weight: 0.5}
					]
				},
				{
					//elementType: 'labels',
					//stylers: [{visibility: 'off'}]
				},
				{
					featureType: 'water',
					stylers: [{color: '#3B7A94'}]
				}
			], {
				name: 'Grey'
			});
			var customMapTypeId = 'custom_style';

			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 18,
				center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
				}
			});

			map.mapTypes.set(customMapTypeId, customMapType);
			map.setMapTypeId(customMapTypeId);
		}

		$scope.init = function() {
			//$scope.pageParams.busy = true;
			//$scope.pageParams.offline = false;
			if(!$scope.user) {
				return;
			}

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition($scope.initMap);
			} else {
				x.innerHTML = "Geolocation is not supported by this browser.";
			}

			//api.user.get({
			//	name: $scope.user.name
			//}, function(user) {
			//	$scope.pageParams.busy = false;
			//}, function(error) {
			//	$scope.pageParams.busy = false;
			//	$scope.pageParams.offline = true;
			//})
		};

		$scope.$watch("user", $scope.init);
	});