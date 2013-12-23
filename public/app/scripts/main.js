var myApp = angular.module('baisMordechai', ['ui.router']);

function FilesController($scope, $http) {

	$http.get('/files').success(function(files) {
		$scope.files = files;
	});

	$http.get('/files/1').success(function(file) {
		$scope.activeFile = file;
		console.log($scope);
	});

	$scope.getFile = function(fileId){
		$http.get('/files/'+fileId).success(function(file) {
		$scope.activeFile = file;
	});
	};

	$scope.isActive = function(file) {
		return file.id == $scope.activeFile.id;
    };
}
