(function() {

	jQuery(function($) {
		$(document).foundation();
	});

	window.app = angular.module('appPublic', ['ngRoute', 'ngCookies', 'ngAnimate']);
	
	window.app.config(function($routeProvider, $locationProvider, $httpProvider) {
		
		$routeProvider
			.when('/', {
				templateUrl: '/pages/home.html'
			})
			.when('/login', {
				templateUrl: '/pages/login.html'
			})
			.when('/dashboard', {
				templateUrl: '/pages/dashboard.html'
			})
			.when('/upgrade', {
				templateUrl: '/pages/upgrade.html'
			})
			.when('/account', {
				templateUrl: '/pages/account.html'
			})
			.when('/account/cards', {
				templateUrl: '/pages/accountCards.html'
			})
			.when('/account/cards/new', {
				templateUrl: '/pages/accountCardsNew.html'
			})
			.when('/account/plans', {
				templateUrl: '/pages/accountPlans.html'
			});

		$locationProvider.html5Mode(true);

		$httpProvider.interceptors.push(['$location', 'accAuth', function($location, accAuth) {
			return {
				request: function(config) {
					switch ($location.$$path) {
						case '/dashboard':
						case '/upgrade':
						case '/account':
						case '/account/plans':
						case '/account/cards':
						case '/account/cards/new':
							accAuth.screen(function(isAllowed) {
								if (!isAllowed) { 
									$location.path('/login'); 
									return;
								}
								return config;
							});
						break;
					}
					return config;
				}
			}
		}]);

	});

})();