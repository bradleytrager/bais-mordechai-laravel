var myApp = angular.module('baisMordechai', ['ui.router']);

myApp.controller('FilesController', function($scope, $http) {


	$http.get('/files').success(function(files) {
		$scope.files = files;
	});



	$scope.getFile = function(fileId) {
		$http.get('/files/' + fileId).success(function(file) {
			$scope.activeFile = file;
		});
	};

	$scope.isActive = function(file) {
		if ($scope.activeFile) {
			return file.id == $scope.activeFile.id;
		}
	};

	$scope.submit = function() {
		console.log("save");
		$http.put("/files/" + $scope.activeFile.id, $scope.activeFile);
	};
});