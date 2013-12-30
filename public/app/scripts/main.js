var app = angular.module('baisMordechai', ['angularFileUpload', 'ngRoute', 'ui.router', 'ngAnimate']);

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
		.state('page', {
			url: '/page/:page',
			views: {
				'breadcrumbs': {
					templateUrl: 'app/templates/breadcrumbs.html',
					controller: 'BreadCrumbController'
				},
				'main-content': {
					templateUrl: function($stateParams) {
						return 'app/templates/' + $stateParams.page + '.html';
					}
				}
			}
		});
	$urlRouterProvider.otherwise("/");
});