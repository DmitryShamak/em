angular.module("app")
    .controller("ProfileCtrl", function($rootScope, $scope, $interval, $state, api) {
        if(!$rootScope.user && !$rootScope.busy) {
            $state.go("login");
        }

        var UserProfile = function(attrs) {
            var self = this;
            self.name = attrs.name;
            self.lastname = attrs.lastname;
            self.dob = moment(attrs.dob).toDate();
            self.address = attrs.address;
            self.email = attrs.email;
            self.phone = attrs.phone;
        };

        $scope.pageParams = {
            busy: true
        };

        $scope.updateProfile = function(data) {
            $scope.pageParams.busy = true;
            $scope.pageParams.offline = false;
            var userData = new UserProfile(data);

            api.user.update({
                query: {
                    _id: $scope.user._id
                },
                updates: userData
            }, function() {
                $scope.pageParams.busy = false;
                $scope.pageParams.offline = false;
            }, function(error) {
                $scope.pageParams.busy = false;
                $scope.pageParams.offline = true;
            });
        };

        $scope.resetChanges = function() {
            $scope.userProfile = new UserProfile($scope.userBackup);
        };

        $scope.init = function() {
            $scope.pageParams.busy = false;
            $scope.pageParams.offline = false;
            if(!$scope.user) {
                return;
            }
            $scope.pageParams.busy = true;
            api.user.get({
                _id: $scope.user._id
            }, function(user) {
                $scope.userProfile = new UserProfile(user);
                $scope.userBackup = angular.copy(user);
                $scope.pageParams.busy = false;
                $scope.pageParams.offline = false;
            }, function(error) {
                $scope.pageParams.busy = false;
                $scope.pageParams.offline = true;
            })
        };

        $scope.$watch("user", $scope.init);
    });