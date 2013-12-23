var myApp = angular.module('baisMordechai', ['ui.router']);

function FilesController($scope, $http) {


	$http.get('/files').success(function(files) {
		$scope.files = files;
	});

	

	$scope.getFile = function(fileId){
		$http.get('/files/'+fileId).success(function(file) {
		$scope.activeFile = file;
	});
	};

	$scope.isActive = function(file) {
		if($scope.activeFile){
			return file.id == $scope.activeFile.id;
		}
    };
}
