angular.module("app")
	.controller("MapCtrl", function($rootScope, $scope, $state, api) {
		if(!$rootScope.user && !$rootScope.busy) {
			$scope.redirectToMainPage();
		}

		$scope.pageParams = {};
		$scope.pageData = {};

		// Adds a marker to the map.
		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var labelIndex = 0;
		$scope.addMarker = function(location, map) {
			var image = {
				url: '/public/imgs/user_marker.png', // url
				scaledSize: new google.maps.Size(50, 50), // scaled size
				origin: new google.maps.Point(0,0), // origin
				anchor: new google.maps.Point(25, 50) // anchor
			};
			// Add the marker at the clicked location, and add the next-available label
			// from the array of alphabetical characters.
			var marker = new google.maps.Marker({
				position: location,
				//icon: image,
				map: map
			});
		};

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
			var currentPosition = {lat: pos.coords.latitude, lng: pos.coords.longitude};

			$scope.map = new google.maps.Map(document.getElementById('map'), {
				zoom: 17,
				center: currentPosition,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
				}
			});

			$scope.map.mapTypes.set(customMapTypeId, customMapType);
			$scope.map.setMapTypeId(customMapTypeId);

			// This event listener calls addMarker() when the map is clicked.
			//google.maps.event.addListener($scope.map, 'click', function(event) {
			//	$scope.addMarker(event.latLng, $scope.map);
			//});

			// Add a marker at the center of the map.
			$scope.addMarker(currentPosition, $scope.map);

			//map.addMarker({
			//	lat:  pos.coords.latitude,
			//	lng:  pos.coords.longitude,
			//	title: 'Lima',
			//	click: function(e) {
			//		alert('You clicked in this marker');
			//	}
			//});
		};

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