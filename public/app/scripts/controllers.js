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

app.controller('DashboardController', function($scope, files) {
	$scope.files = files;
});

app.controller('DashboardFileController', function($scope, $http, $upload, $timeout, $state, filesService, file){
	$scope.activeFile = file;
	var _getFiles = function() {
		//TODO: refresh dashboard
		console.log($state);
		$state.go('dashboard');
		$state.reload();
	};

	$scope.submit = function() {
		//TODO: move into filesService
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
	$scope.onFileSelect = function($file) {
		//TODO: move into filesService
		$scope.uploadProgressDisplay = 1;
		var file = $file[0];
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

