angular.module("app")
    .directive("globalStats", function() {
        return {
            templateUrl: "/views/common/global_stats.html",
            scope: {stats: "=globalStats"},
            controller: function($scope, api) {
                $scope.selectItem = function(item) {
                    //todo: get item list
                    $scope.activeItem = {
                        title: item.data.title,
                        data: []
                    }
                };
            }
        }
    });