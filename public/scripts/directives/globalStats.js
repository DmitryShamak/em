angular.module("app")
    .directive("globalStats", function() {
        return {
            templateUrl: "/views/common/global_stats.html",
            scope: {stats: "=globalStats"},
            controller: function($scope, api) {
                $scope.selectItem = function(item) {
                    //clear previous active status
                    var currentActive = _.find($scope.stats, {active: true});
                    if(currentActive) {
                        currentActive.active = false;
                    }
                    //set current item active
                    item.active = true;

                    $scope.activeItem = {
                        hasData: item.data.totalCount > 0,
                        title: item.data.title,
                        data: item.data.content
                    }
                };

                $scope.toggleItem = function(item) {
                    item.active = !item.active;
                }
            }
        }
    });