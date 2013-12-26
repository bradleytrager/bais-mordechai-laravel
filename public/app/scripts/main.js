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
myAppStuff.controllers.AppController = function($rootScope) {
	$rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
		console.log(rejection);
	});
};

myAppStuff.controllers.FilesController = function($scope, $http, $upload, $timeout) {
	$scope.getFiles = function() {
		$http.get('/files').success(function(files) {
			$scope.files = files;
		});
	};

	$scope.getFiles();

	$scope.selectFile = function(file) {
		$scope.activeFile = angular.copy(file);
	};

	$scope.isActive = function(file) {
		if ($scope.activeFile) {
			return file.id == $scope.activeFile.id;
		}
	};

	$scope.submit = function() {
		console.log("save");
		if ($scope.activeFile) {
			$http.put("/files/" + $scope.activeFile.id, $scope.activeFile).success(function() {
				$scope.getFiles();
			});
		} else {
			//TODO: create new file
		}

	};
	$scope.complete = function(content) {
		console.log(content); // process content
	};

	$scope.onFileSelect = function($files) {
		$scope.uploadProgressDisplay = 1;
		//$files: an array of files selected, each file has name, size, and type.
		for (var i = 0; i < $files.length; i++) {
			var file = $files[i];
			$scope.upload = $upload.upload({
				url: 'files', //upload.php script, node.js route, or servlet url
				// method: POST or PUT,
				// headers: {'headerKey': 'headerValue'}, withCredential: true,
				//data: {myObj: $scope.myModelObj},
				file: file
				// file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
				/* set file formData name for 'Content-Desposition' header. Default: 'file' */
				//fileFormDataName: myFile,
				/* customize how data is added to formData. See #40#issuecomment-28612000 for example */
				//formDataAppender: function(formData, key, val){} 
			}).progress(function(evt) {
				var progress = parseInt(100.0 * evt.loaded / evt.total);
				$scope.uploadProgressDisplay = progress;

			}).success(function(data, status, headers, config) {
				// file is uploaded successfully
				$scope.tempFileName = data;
			})
			//.error(...)
			.then(function() {
				$timeout(function() {
					$scope.uploadProgressDisplay = 0;
					console.log($scope.uploadProgressDisplay);

				}, 2000);

			});
		}
	};
	$scope.uploadProgressDisplay = 0;
};

myApp.directive('jplayer', function($http, $templateCache, $compile, $parse) {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {

			$http.get('app/templates/jplayer.html', {
				cache: $templateCache
			}).success(function(tplContent) {
				element.replaceWith($compile(tplContent)(scope));
				element.jPlayer({
					ready: function(event) {
						$(this).jPlayer("setMedia", {
							m4a: "http://www.jplayer.org/audio/m4a/TSP-01-Cro_magnon_man.m4a",
							oga: "http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
						});
					},
					swfPath: "js",
					supplied: "m4a, oga",
					wmode: "window",
					smoothPlayBar: true,
					keyEnabled: true
				});
			});
		}
	}
});

myApp.controller(myAppStuff.controllers);