angular.module("app")
	.factory("confirmDialog", function(ngDialog, $interval, $rootScope) {
		var dialog = {};
		dialog.show = function(data, scope) {
			ngDialog.open({ 
				template: '/views/templates/popupTmpl.html',
				controller: function($scope) {
					$scope.rejectDelay = 0.5; //minutes
					$scope.increaseParams = {
						value: 1
					};

					$scope.data = data;
					$scope.onConfirm = function(num) {
						num.rejectDate = moment().add($scope.rejectDelay, "minutes");
						num.progressStatus = 0;
						num.inProgress = true;
						num.startDiff = num.rejectDate.diff(moment());
						num.timer = $interval(function() {
							var diff = num.rejectDate.diff(moment());
							var percent = (1 - (diff / num.startDiff)).toFixed(4); 
							num.progressStatus = Math.min(percent, 1);
							num.progressTimeLeft = num.rejectDate.fromNow();
							if(num.progressStatus >= 1) {
								scope.increaseNumber(num, $scope.increaseParams.value);
								$interval.cancel(num.timer);
							}
						}, num.startDiff/1000);

						ngDialog.close();
					};
					$scope.onCancel = function() {
						ngDialog.close();
					};
				}
			});
		};

		return dialog;
	});