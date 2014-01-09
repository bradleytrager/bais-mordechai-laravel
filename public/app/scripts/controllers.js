angular.module('app.controllers', [	'angularFileUpload'])
.controller('AppController', function($scope, $rootScope, $state, $stateParams, $http) {
	$rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
		console.log(rejection);
	});
})
.controller('BreadCrumbController', function($scope, $state, $stateParams, breadcrumbService) {
	$scope.breadcrumbs = [];
	$scope.$on('$stateChangeSuccess', function() {
		$scope.breadcrumbs = breadcrumbService.getBreadcrumbs($state, $stateParams);
	});
})
.controller('HomeController', function($scope, currentParashah, whatsNew){
	$scope.currentParashah = currentParashah;
	$scope.whatsNew = whatsNew;
	console.log(whatsNew);
})
.controller('contactController', function($scope, $http){
	$scope.submit = function(message){
		if($scope.contactForm.$valid){
			console.log(message);
			$http.post("/contact/", message).then(function(response){
				alert("Thank you, your message has been submitted");
				$scope.contactForm.$setPristine();
				//$scope.message = {};
			});
		}
		else{
			// alert("Please fix requiered fields.");
			console.log(message);
			console.log($scope.contactForm);
		}
	};
})
.controller('FilesController', function($scope, $stateParams, $filter, files) {
	$scope.subcategory = $filter('ucfirst')($stateParams.subcategory);
	$scope.files = files;
})
.controller('FileController', function($scope, file) {
	$scope.file = file;
})
.controller('DashboardController', function($scope, filesService, files) {
	$scope.files = files;
	$scope.refreshFiles = function() {
		filesService.getAllFiles().then(function(files) {
			$scope.files = files;
		});
	};
})
.controller('DashboardFileController', function($scope, $http, $upload, $timeout, $state, filesService, file) {
	
	$scope.activeFile = file;
	$scope.categories = BaisMordechai.categories;
	$scope.subcategories = BaisMordechai.subcategories;
	$scope.changeCategory = function(){
		$scope.activeFile.category = $scope.activeFile.category;
		$scope.activeFile.subcategory = $scope.subcategories[$scope.activeFile.category][0];
	};
	// $scope.changeSubcategory = function(){
	// 	$scope.activeFile.subcategory = $scope.subcategories[$scope.activeFile.category][0];
	// };
	$scope.submit = function() {
		if ($scope.activeFile.id) {
			filesService.updateFile($scope.activeFile).then(function(file) {
				$scope.$parent.refreshFiles();
				$scope.activeFile = file;
			});
		} else {
			filesService.createFile($scope.activeFile).then(function(file){
				$scope.$parent.refreshFiles();
				$state.go('dashboard.item', {
					id: file.id
				});
			});
		}
	};
	$scope.deleteFile = function() {
		filesService.deleteFile($scope.activeFile).then(function() {
			$scope.$parent.refreshFiles();
			$state.go('dashboard.item', {
				id: ""
			});
		});
	};
	$scope.onFileSelect = function($file) {
		$scope.uploadProgressDisplay = 1;
		var file = $file[0];
		$scope.upload = $upload.upload({
			url: 'files',
			file: file
		}).progress(function(evt) {
			var progress = parseInt(100.0 * evt.loaded / evt.total, 10);
			$scope.uploadProgressDisplay = progress;
		}).success(function(response, status, headers, config) {
			$scope.activeFile.filename = file.name;
		})
		//.error(...)
		.then(function() {
			$timeout(function() {
				$scope.uploadProgressDisplay = 0;
			}, 500);
		});
	};
	$scope.uploadProgressDisplay = 0;
});