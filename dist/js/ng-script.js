(function() {
	angular.module("app", [
		'ngResource',
		'ui.router',
		'ngDialog'
	]);
})();
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
            document.cookie = null;
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
  .run(function($rootScope, $state, $injector, $location, auth) {
    auth.hookEvents();

    $rootScope.getToken = function() {
        var cookie = document.cookie.split(";");
        var token;
        _.forEach(cookie, function(item) {
            if(item.charAt(0) == ' ') {
                token = item.substring(1);
            }
        });

        return token;
    };

    $rootScope.redirectToMainPage = function() {
        $state.go("landing");
    };

    $rootScope.checkAuthentication = function() {
        if(!$rootScope.user) {
            $rootScope.busy = false;
            var api = $injector.get('api');
            var token = $rootScope.getToken();
            if(!token) {
                $state.go("login");
            }
            $rootScope.busy = true;
            api.authenticate.save({token: token}, function(user) {
                $rootScope.user = user;
                var state = $state.current.name;

                if(state === "login") {
                    $rootScope.redirectToMainPage();
                } else {
                    $state.go(state);
                }
                $rootScope.busy = false;
            }, function(err) {
                $state.go("login");
                $rootScope.busy = false;
            });
        }
    };

    $rootScope.checkAuthentication();

    $rootScope.apply = function(scope) {
      if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
          scope.$apply();
      }
    };
  });
angular.module("app")
	.controller("LandingCtrl", function($rootScope, $scope, $interval, $state, api) {
		if(!$rootScope.user && !$rootScope.busy) {
	      $state.go("login");
	    }

		$scope.pageParams = {};

		$scope.init = function() {
			$scope.pageParams.busy = true;
			$scope.pageParams.offline = false;
			if(!$scope.user) {
				return;
			}

			api.user.get({
				name: $scope.user.name
			}, function(user) {
				$scope.userHistory = user.history;
				$scope.pageParams.busy = false;
			}, function(error) {
				$scope.pageParams.busy = false;
				$scope.pageParams.offline = true;
			})
		};

		$scope.$watch("user", $scope.init);
	});

angular.module("app")
	.controller("LogInCtrl", function($rootScope, $scope, $state, api) {
		$scope.userData = {};
		
		$scope.logIn = function(userData) {
			if($scope.busy) {
				return;
			}

			if(!userData.name || !userData.password) {
				return $scope.invalid = true;
			}
			$scope.invalid = false;
			$scope.busy = true;

			api.login.save(userData, function(response) {
				$scope.busy = false;
				//set cookies
				document.cookie = response.token;
				$rootScope.user = {name: response.name};
				$state.go("landing");
			}, function(error) {
				console.log(error);
				userData.password = null;
				$scope.invalid = true;
				$scope.busy = false;
			});
		};
	});
angular.module("app")
	.controller("NavigationCtrl", function($scope, scoreboardDialog) {
		$scope.createScoreboard = function() {
			scoreboardDialog.show();
		};

		$scope.updateNotificationCount = function() {
			$scope.notificationsCount = 0;
		};

		$scope.navigation = {};
		var topLinks = {};
		topLinks.landing = {
			title: "Home",
				state: "landing",
				icon: "fa-home",
				value: $scope.notificationsCount || 0
		};
		topLinks.sources = {
			title: "Sources",
			state: "sources",
			icon: "fa-external-link",
			value: $scope.sourcesCount || 0
		};
		topLinks.news = {
			title: "News",
			state: "news",
			icon: "fa-newspaper-o",
			value: $scope.newsCount || 0
		};

		$scope.navigation.topLinks = topLinks;

		var bottomLinks = {};
		bottomLinks.scoreboard = {
			title: "Create New Scoreboard",
			icon: "fa-plus-square",
			action: $scope.createScoreboard
		};

		bottomLinks.logout = {
			title: "Log Out",
			state: "logout",
			icon: "fa-sign-out"
		};
		$scope.navigation.bottomLinks = bottomLinks;

		//update history link
	});
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
angular.module("app")
	.controller("SignUpCtrl", function($rootScope, $scope, $state, api) {
		$scope.userData = {};

		$scope.signIn = function(userData) {
			if($scope.busy) {
				return;
			}

			$scope.invalid = false;
			$scope.busy = true;
			//check data validation
			api.user.save({
				name: userData.name,
				password: userData.password
			}, function(response) {
				//set cookie
				document.cookie = response.token;
				$rootScope.user = {name: userData.name};
				//set data to db
				$state.go("landing");
			}, function(error) {
				console.log(error);
				$scope.invalid = true;
				$scope.busy = false;
			});
		};
	});
angular.module("app")
	.directive("navigation", function() {
		return {
			templateUrl: "/views/navigation.html",
			controller: "NavigationCtrl",
			replace: true
		}
	})
angular.module("app")
    .directive("navigationLink", function() {
       return {
           templateUrl: "/views/common/navigation_link.html",
           scope: {item: "=navigationLink"},
           link: function(scope) {

           }
       }
    });
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
angular.module("app")
    .factory("notify", function($document, $timeout) {
        var notify = {};
        notify.show = function(attrs) {
            var elem = $("<div class='text-center animated fadeInDown notify'></div>");
            elem.text(attrs.text);
            elem.addClass("alert alert-" + (attrs.type || "info") );

            $('body').append(elem);

            $timeout(function() {
                notify.hide(elem);
            }, 3000);
        };
        notify.hide = function(elem) {
            elem.hide().delay(200).remove();
        };

        return notify;
    });