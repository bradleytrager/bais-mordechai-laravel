var app = angular.module('baisMordechai', ['angularFileUpload', 'ngRoute', 'ui.router', 'ngAnimate']);
app.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});
app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/templates/home.html'
		})
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: '/dashboard',
			controller: "DashboardController",
			resolve: {
				files: function(filesService) {
					return filesService.getAllFiles();
				}
			}
		})
		.state('dashboard.item', {
			url: '/:id',
			templateUrl: 'app/templates/dashboard.item.html',
			controller: 'DashboardFileController',
			resolve: {
				file: function($stateParams, filesService) {
					var id = $stateParams.id;
					return filesService.getFileById(id);
				}
			}
		})
	.state('listen', {
		url: '/listen',
		templateUrl: 'app/templates/page.html',
		abstract: true
	})
		.state('listen.category', {
			url: '/:category',
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
		.state('listen.category.subcategory', {
			url: '/:subcategory',
			views: {
				'main-content@listen': {
					templateUrl: 'app/templates/items.html',
					controller: 'FilesController'
				}
			},
			resolve: {
				files: function($stateParams, $filter, filesService) {
					var category = $filter('ucfirst')($stateParams.category);
					var subcategory = $filter('ucfirst')($stateParams.subcategory);
					return filesService.getFilesByCategory(category, subcategory);
				}
			}
		})
		.state('listen.category.subcategory.item', {
			url: '/:id',
			templateUrl: 'app/templates/item.html',
			controller: 'FileController',
			resolve: {
				file: function($stateParams, $filter, filesService) {
					var category = $filter('ucfirst')($stateParams.category);
					var subcategory = $filter('ucfirst')($stateParams.subcategory);
					var id = $stateParams.id;
					return filesService.getFileByCategory(category, subcategory, id);
				}
			}
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