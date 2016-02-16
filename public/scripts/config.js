function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/login");

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
        .state('login', {
          url: "/login",
          templateUrl: "/views/login.html",
          data: {
           pageTitle: 'LogIn'
          },
          controller: "LogInCtrl"
        })
        .state('logout', {
          url: "/logout",
          data: {
           pageTitle: 'Log Out'
          },
          controller: function($rootScope, $state) {
            $rootScope.user = null;
            document.cookie = "expired";
            $state.go("login");
          }
        })
        .state('landing', {
          url: "/landing",
          templateUrl: "/views/landing.html",
          data: {
           pageTitle: 'Landing'
          },
          controller: "LandingCtrl"
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
        $state.go("landing");
    };

    $rootScope.checkAuthentication = function() {
        if(!$rootScope.user) {
            var token = $rootScope.getToken();
            if(!token) {
                return $state.go("login");
            }
            $rootScope.user = JSON.parse(token);
            var state = $state.current.name || $window.location.pathname.substring(1);
            if(!state || state === "login") {
                $window.location.href = "/landing";
            } else {
                $state.go(state);
            }
        }
    };

    $rootScope.checkAuthentication();

    $rootScope.apply = function(scope) {
      if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
          scope.$apply();
      }
    };
  });