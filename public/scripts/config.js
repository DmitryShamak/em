function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/landing");

    jQuery.ajaxSetup({cache: true});

    $stateProvider
        .state('signup', {
          url: "/signup",
          templateUrl: "/views/signup.html",
          data: {
           pageTitle: 'Sign Up'
          },
          controller: "SignUpCtrl"
        })
        .state('landing', {
          url: "/landing",
          templateUrl: "/views/landing.html",
          data: {
           pageTitle: 'Landing'
          },
          controller: "LandingCtrl"
        })
        .state('home', {
            url: "/home",
            templateUrl: "/views/home.html",
            data: {
                pageTitle: 'Home'
            },
            controller: "HomeCtrl"
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "/views/profile.html",
            data: {
                pageTitle: 'Profile'
            },
            controller: "ProfileCtrl"
        })
        .state('map', {
            url: "/map",
            templateUrl: "/views/map.html",
            data: {
                pageTitle: 'My Map'
            },
            controller: "MapCtrl"
        })
        .state('join', {
          url: "/join/:id",
          templateUrl: "/views/scoreboard.html",
          data: {
           pageTitle: 'Scoreboard'
          },
          controller: "ScoreboardCtrl"
        });
};

angular
  .module('app')
  .config(config)
  .run(function($rootScope, $state, $window, $location) {
    $rootScope.getToken = function() {
        return $.cookie("user");

        return token;
    };

    $rootScope.redirectToMainPage = function() {
        var state = $state.current.name || $window.location.pathname.substring(1);

        if(state != "landing") {
            return $window.location.href = "/landing";
        }
        $state.go(state);
    };

    $rootScope.logout = function() {
        $window.location.href = "/logout";
    };

    $rootScope.checkAuthentication = function() {
        var token = $rootScope.getToken();
        var state = $state.current.name;
        if(!$rootScope.user) {
            if(token && token != "undefined") {
                $rootScope.user = JSON.parse(token);
            }

            if(token && (!state)) {
                $state.go("home");
            }
        }
    };

    $rootScope.checkAuthentication();
    $rootScope.$on('$stateChangeStart', function() {
        var token = $rootScope.getToken();
        var state = $state.current.name;
        if(!$rootScope.user && token && token != "undefined") {
            $rootScope.user = JSON.parse(token);
        } else if(!$rootScope.user && state && state != "landing") {
            $window.location.href = "/landing";
        }

    });

    $rootScope.apply = function(scope) {
      if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
          scope.$apply();
      }
    };
  });