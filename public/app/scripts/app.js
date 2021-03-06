var app = angular.module('baisMordechai', [
	'ui.router',
	'ngAnimate',
	'ui.select2',
	'app.controllers',
	'app.directives',
	'app.filters',
	'app.services'
]);

app.run(function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});

app.config(function($stateProvider, $urlRouterProvider, $controllerProvider, $httpProvider, webServiceURL) {
	/*
	Prompt for credentials:
	http://stackoverflow.com/questions/13734686/communication-between-angularjs-and-a-jersey-webservice-which-are-on-a-different/14111039#14111039
	 */
	$httpProvider.defaults.withCredentials = true;
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/templates/home.html',
			controller: 'HomeController',
			resolve: {
				currentParashah: function($http) {
					return $http.get(webServiceURL + 'current_parashah/').then(function(response) {
						return response.data;
					});
				},
				whatsNew: function($http) {
					return $http.get(webServiceURL + 'whats_new/').then(function(response) {
						return response.data;
					});
				}
			}
		})
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: webServiceURL + '/dashboard',
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
	.state('category', {
		url: '/listen/:category',
		templateUrl: function($stateParams) {
			return 'app/templates/' + $stateParams.category + '.html';
		}
	})
		.state('subcategory', {
			url: '/listen/:category/:subcategory',
			templateUrl: 'app/templates/items.html',
			controller: 'FilesController',
			resolve: {
				files: function($stateParams, $filter, filesService) {
					var category = $filter('ucfirst')($stateParams.category);
					var subcategory = $filter('ucfirst')($stateParams.subcategory);
					return filesService.getFilesByCategory(category, subcategory);
				}
			}
		})
		.state('subcategory.item', {
			url: '/:id',
			views:{
				'title':{
					template: '<h1 ng-bind="file.title"></h1>',
					controller: 'FileController'
				},
				'description':{
					template: '<p ng-bind="file.description"></p>',
					controller: 'FileController'
				}
			},
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
			url: 'page/:page',
			controllers:['contactController'],
			views: {
				'@': {
					templateUrl: function($stateParams) {
						return 'app/templates/pages/' + $stateParams.page + '/index.html';
					}
				}
			},
			parent: 'home'
		})
		.state('page.subpage', {
			url: '/:subpage',
			templateUrl: function($stateParams) {
				return 'app/templates/pages/' + $stateParams.page + '/' + $stateParams.subpage + '.html';
			}
		});
	$urlRouterProvider.otherwise("/");
});