var myApp = angular.module('baisMordechai', ['angularFileUpload', 'ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: '/dashboard',
			controller: "FilesController"
		})
		.state('shiurim', {
			url: '/shiurim',
			templateUrl: 'app/templates/shiurim.html'
		});
	$urlRouterProvider.otherwise("/dashboard");
});

myAppStuff = {};
myAppStuff.controllers = {};
