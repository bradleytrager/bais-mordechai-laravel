var app = angular.module('baisMordechai', ['angularFileUpload', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: '/dashboard',
			controller: "FilesController"
		})
		.state('shiurim', {
			url: '/shiurim',
			templateUrl: 'app/templates/shiurim.html',
			controller: "ShiurController"
		})
		.state('shiur', {
                url: '/shiur/:id',
                templateUrl: 'app/templates/shiur.html',
                controller: 'ShiurController'
            });
	$urlRouterProvider.otherwise("/shiurim");
});