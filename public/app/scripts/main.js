var app = angular.module('baisMordechai', ['angularFileUpload', 'ngRoute', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/templates/home.html'
		})
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: '/dashboard',
			controller: "FilesController"
		})
		.state('listen', {
			url: '/listen/:category/:subcategory',
			templateUrl: 'app/templates/items.html',
			controller: 'ItemController'
		})
		.state('listen.item', {
			url: '/:id',
			templateUrl: 'app/templates/item.html',
			controller: 'ItemController'
		})
		.state('shiurim', {
			url: '/shiurim',
			templateUrl: 'app/templates/shiurim.html'
		})
		.state('music', {
			url: '/music',
			templateUrl: 'app/templates/music.html'
		})
		.state('leading-services', {
			url: '/leading-services',
			templateUrl: 'app/templates/leading_services.html'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'app/templates/contact.html'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'app/templates/about.html'
		});
	$urlRouterProvider.otherwise("/");
});

app.filter('ucfirst', function() {
	return function(input) {
		var out = input.charAt(0).toUpperCase();
		for (var i = 1; i < input.length; i++) {
			var currentChar = input.charAt(i);
			if (input.charAt(i - 1) == " ") {
				currentChar = currentChar.toUpperCase();
			}
			out += currentChar;
		}
		return out;
	};
});