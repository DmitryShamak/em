angular.module("app")
    //.config(['$resourceProvider', function($resourceProvider) {
    //    // Don't strip trailing slashes from calculated URLs
    //    $resourceProvider.defaults.stripTrailingSlashes = false;
    //}])
    .factory("api", function($resource) {
        var api = {};
        /*
        * User [add, get, find, update]
        * scoreboard [add, get, update, delete]
        * */
        api.login = $resource("/api/login");
        api.user = $resource("/api/user", null, {
            'update': { method:'PUT' }
        });
        api.authenticate = $resource("/api/authenticate");
        api.scoreboard = $resource("/api/scoreboard/:key", null, {
            'update': { method:'PUT' }
        });
        api.source = $resource("/api/source", null, {
            'update': { method:'PUT' }
        });
        api.search = $resource("/api/search");

        return api;
    });