var app = angular.module('baisMordechai', ['angularFileUpload', 'ngRoute', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			views: {
				'breadcrumbs': {},
				'main-content': {
					templateUrl: 'app/templates/home.html'
				}
			}
		})
		.state('dashboard', {
			url: '/dashboard',
			views: {
				'breadcrumbs': {},
				'main-content': {
					templateUrl: '/dashboard',
					controller: "FilesController"
				}

			}

		})
		.state('listen', {
			url: '/listen/:category/:subcategory',
			views: {
				'breadcrumbs': {
					templateUrl: 'app/templates/breadcrumbs.html',
					controller: 'BreadCrumbController'
				},
				'main-content': {
					templateUrl: 'app/templates/items.html',
					controller: 'ItemController'
				}
			}
		})
		.state('listen.item', {
			url: '/:id',
			templateUrl: 'app/templates/item.html',
			controller: 'ItemController'
		})
		.state('shiurim', {
			url: '/shiurim',
			views: {
				'breadcrumbs': {
					templateUrl: 'app/templates/breadcrumbs.html'
				},
				'main-content': {
					templateUrl: 'app/templates/shiurim.html'
				}
			}
		})
		.state('category', {
			url: '/listen/:category',
			views: {
				'breadcrumbs': {
					templateUrl: 'app/templates/breadcrumbs.html',
					controller: 'BreadCrumbController'
				},
				'main-content': {
					templateUrl: function($stateParams) {
						return 'app/templates/' + $stateParams.category + '.html';
					}
				}
			}
		});
	$urlRouterProvider.otherwise("/");
});

app.filter('ucfirst', function() {
	return function(input) {
		var out = input.charAt(0).toUpperCase();
		for (var i = 1; i < input.length; i++) {

			var currentChar = input.charAt(i);

			if (currentChar == "_") {
				currentChar = " ";
			}
			if (out.charAt(i - 1) == " ") {
				currentChar = currentChar.toUpperCase();
			}
			out += currentChar;
		}
		return out;
	};
});