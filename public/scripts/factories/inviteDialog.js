angular.module("app")
	.factory("inviteDialog", function(ngDialog, $interval, api) {
		var dialog = {};
		dialog.show = function(scope) {
			ngDialog.open({ 
				template: '/views/templates/inviteTmpl.html',
				controller: function($scope) {
					$scope.onConfirm = function(newUser) {
						//get user by name
						if(!newUser.name || newUser.name == $scope.user.name) {
							return console.info("Invalid user");
						}
						api.user.get({name: newUser.name}, function(res) {
							//send request to user
							var newNum = scope.getEmptyNum(newUser.name);
							ngDialog.close();
						}, function(error) {
							console.error("No such user");
						});
					};
					$scope.onCancel = function() {
						ngDialog.close();
					};
				} 
			});
		};

		return dialog;
	});