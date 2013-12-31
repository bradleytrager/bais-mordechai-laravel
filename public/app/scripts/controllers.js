app.controller('AppController', function($scope, $rootScope, $state ,$stateParams) {
	$rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
		console.log(rejection);
	});
	
});
app.controller('BreadCrumbController', function($scope, $stateParams, $state) {
	$scope.crumbs = [];
	angular.forEach($stateParams, function(value, key) {
		this.push(value);
	}, $scope.crumbs);
});

app.controller('FilesController', function($scope, $stateParams, $filter, files) {
	$scope.subcategory = $filter('ucfirst')($stateParams.subcategory);
	$scope.files = files;
});

app.controller('FileController', function($scope, file) {
	$scope.file = file;
});

app.controller('DashboardController', function($scope, filesService, files) {
	$scope.files = files;
	$scope.refreshFiles = function() {
		filesService.getAllFiles().then(function(files) {
			$scope.files = files;
		});
	};
});

app.controller('DashboardFileController', function($scope, $http, $upload, $timeout, $state, filesService, file) {
	$scope.activeFile = file;

	$scope.submit = function() {
		if ($scope.activeFile.id) {
			filesService.updateFile($scope.activeFile).then(function(file) {
				$scope.$parent.refreshFiles();
				$scope.activeFile = file;
			});
		} else {
			filesService.createFile($scope.activeFile).then(function(file){
				$scope.$parent.refreshFiles();
				$state.go('dashboard.item', {id:file.id});
			});
		}
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