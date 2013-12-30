app.controller('AppController', function($rootScope) {
	$rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
		console.log(rejection);
	});
});
app.controller('BreadCrumbController', function($scope, $stateParams) {
	$scope.crumbs = [];
	angular.forEach($stateParams, function(value, key) {
		this.push(value);

	}, $scope.crumbs);
	console.log($scope.crumbs);

});
app.controller('ItemController', function($scope, $stateParams, $http, $location, $state, $filter, files) {
	
	$scope.id = $stateParams.id;
	$scope.category = $filter('ucfirst')($stateParams.category);
	$scope.subcategory = $filter('ucfirst')($stateParams.subcategory);
	
	$scope.file = {};
	$scope.files = [];

	$scope.getFiles = function() {
		files.getFilesByCategory($scope.category, $scope.subcategory).then(function(files){
			$scope.files = files;
		});
	};
	$scope.getFile = function() {
		files.getFileByCategory($scope.category, $scope.subcategory, $scope.id).then(function(file){
			$scope.file = file;
		});
	};
	
	$scope.getFiles();
	
	if($scope.category && $scope.subcategory && $scope.id){
		$scope.getFile();
	}

});

app.controller('FilesController', function($scope, $http, $upload, $timeout) {
	$scope.activeFile = {};
	$scope.getFiles = function() {
		$http.get('/files').success(function(files) {
			$scope.files = files;
		});
	};

	$scope.getFiles();

	$scope.selectFile = function(file) {
		$scope.activeFile = angular.copy(file);
	};

	$scope.setFile = function(file) {
		var filename = $(file).val().replace(/C:\\fakepath\\/i, '');
		$scope.activeFile.filename = filename;
	};
	$scope.clearActiveFile = function() {
		$scope.activeFile = {};
	};

	$scope.isActive = function(file) {
		if ($scope.activeFile) {
			return file.id == $scope.activeFile.id;
		}
	};

	$scope.submit = function() {
		console.log($scope.activeFile);
		if ($scope.activeFile.id) {
			$http.put("/files/" + $scope.activeFile.id, $scope.activeFile).success(function(file) {
				$scope.getFiles();
				$scope.activeFile = file;
			});
		} else {
			$http.post("/files", $scope.activeFile).success(function(file) {
				$scope.getFiles();
				$scope.activeFile = file;
			});
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
				data: $scope.activeFile,
				file: file
				// file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
				/* set file formData name for 'Content-Desposition' header. Default: 'file' */
				//fileFormDataName: myFile,
				/* customize how data is added to formData. See #40#issuecomment-28612000 for example */
				//formDataAppender: function(formData, key, val){} 
			}).progress(function(evt) {
				var progress = parseInt(100.0 * evt.loaded / evt.total);
				$scope.uploadProgressDisplay = progress;

			}).success(function(file, status, headers, config) {
				// file is uploaded successfully
				console.log(file);
				$scope.activeFile = file;
			})
			//.error(...)
			.then(function() {
				$timeout(function() {
					$scope.uploadProgressDisplay = 0;
					console.log($scope.uploadProgressDisplay);

				}, 500);
				$scope.getFiles();

			});
		}
	};
	$scope.uploadProgressDisplay = 0;
});