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
});

app.controller('FilesController', function($scope, $stateParams, $filter, files) {
	$scope.subcategory = $filter('ucfirst')($stateParams.subcategory);
	$scope.files = files;
});

app.controller('FileController', function($scope, file) {
	$scope.file = file;
});

app.controller('DashboardController', function($scope, $http, $upload, $timeout, filesService, files) {
	$scope.activeFile = {};
	$scope.files = files;
	console.log(files);


	var _getFiles = function() {
		filesService.getAllFiles().then(function(files) {
			$scope.files = files;
		});
	};

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
				_getFiles();
				$scope.activeFile = file;
			});
		} else {
			$http.post("/files", $scope.activeFile).success(function(file) {
				_getFiles();
				$scope.activeFile = file;
			});
		}

	};
	$scope.complete = function(content) {
		console.log(content); // process content
	};

	$scope.onFileSelect = function($file) {
		$scope.uploadProgressDisplay = 1;
		var file = $file[0];
		console.log("filename", file.name);
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
			var progress = parseInt(100.0 * evt.loaded / evt.total, 10);
			$scope.uploadProgressDisplay = progress;

		}).success(function(file, status, headers, config) {
			// file is uploaded successfully
			console.log(file);
			//$scope.activeFile = file;
			$scope.activeFile.filename = file[0].name;
		})
		//.error(...)
		.then(function() {
			$timeout(function() {
				$scope.uploadProgressDisplay = 0;
				console.log($scope.uploadProgressDisplay);

			}, 500);
			_getFiles();
		});
	};
	$scope.uploadProgressDisplay = 0;
});