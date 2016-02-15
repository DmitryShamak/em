angular.module('app')
    .directive('pageTitle', function pageTitle($rootScope, $timeout) {
        return {
            link: function (scope, element) {
                var listener = function (event, toState) {
                    // Default title - load on Dashboard 1
                    var defTitle = 'Hi, what`s up?';
                    // Create your own title pattern
                    var title = toState.data.pageTitle;
                    $timeout(function () {
                        element.text(title || defTitle);
                    });
                };
                $rootScope.$on('$stateChangeStart', listener);
            }
        }
    });