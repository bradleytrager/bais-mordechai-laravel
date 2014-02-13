angular.module('app.controllers', ['angularFileUpload'])
	.controller('AppController', function($scope, $rootScope, $state, $stateParams, $http) {
		$rootScope.$stateParams = $stateParams;
		// console.log($scope.$stateParams);
	})
	.controller('BreadCrumbController', function($scope, $state, $stateParams, breadcrumbService) {
		$scope.breadcrumbs = [];
		$scope.$on('$stateChangeSuccess', function() {
			$scope.breadcrumbs = breadcrumbService.getBreadcrumbs($state, $stateParams);
		});
	})
	.controller('HomeController', function($scope, $filter, currentParashah, whatsNew) {
		$scope.currentParashah = currentParashah;
		$scope.whatsNew = [];
		angular.forEach(whatsNew, function(item) {
			$scope.whatsNew.push({
				category: $filter('tolower')(item.category),
				subcategory: $filter('tolower')(item.subcategory),
				title: item.title,
				created_at: item.created_at
			});
		});
	})
	.controller('contactController', function($scope, $http, webServiceURL) {
		$scope.submit = function(message) {
			if ($scope.contactForm.$valid) {
				//console.log(message);
				$http.post(webServiceURL + "/contact/", message).then(function(response) {
					alert("Thank you, your message has been submitted");
					$scope.contactForm.$setPristine();
					$scope.message = {};
				});
			} else {
				alert("Please fix requiered fields.");
			}
		};
	})
	.controller('FilesController', function($scope, $rootScope, $stateParams, $state, $filter, $sce, files, webServiceURL) {
		$scope.subcategory = $filter('ucfirst')($stateParams.subcategory);
		//Append webservice url and specify ogg filename
		angular.forEach(files, function(file) {
			file.filename = 'uploads/' + file.filename;
			file.oggFilename = file.filename.split(".")[0] + ".ogg";
			file.oggFilename = webServiceURL + file.oggFilename;
			file.filename = webServiceURL + file.filename;
		});
		// 
		// $scope.trustSrc = function(src) {
		// 	return $sce.trustAsResourceUrl(src);
		// };

		//Create playlist for jplayer
		$scope.playlist = [];
		angular.forEach(files, function(file){
			$scope.playlist.push({
				title:file.title,
				mp3:file.filename
			})
		});
		$scope.currentIndex = 0;
		$scope.reload = function(){
			$state.reload();
		};
		// $scope.wasInteraction = false;
		// $scope.isPlaying = false;
		// $scope.play = function(index) {
		// 	console.log("play");
		// 	if (!$scope.wasInteraction) {
		// 		angular.forEach(files, function(file, index) {
		// 			document.getElementById("audioPlayer" + index).play();
		// 			document.getElementById("audioPlayer" + index).pause();
		// 		});
		// 	}
		// 	$scope.wasInteraction = true;
		// 	if ($scope.isPlaying) {
		// 		document.getElementById("audioPlayer" + $scope.currentIndex).pause();
		// 	} else {
		// 		$scope.isPlaying = true;
		// 	}
		// 	// document.getElementById("audioPlayer" + index).focus();
		// 	// document.getElementById("audioPlayer" + index).load();
		// 	document.getElementById("audioPlayer" + index).play();
		// 	$scope.currentIndex = index;
		// };
		$scope.files = files;
		
		// $scope.next = function(index) {
		// 	if (index == files.length - 1) {
		// 		index = 0;
		// 	} else {
		// 		index++;
		// 	}
		// 	$scope.play(index);
		// 	$state.go('listen.category.subcategory.item', {
		// 		category: $stateParams.category,
		// 		subcategory: $stateParams.subcategory,
		// 		id: $scope.files[index].title
		// 	});
		// }
	})
	.controller('FileController', function($scope, file, $stateParams, $state, $sce, webServiceURL) {
		file.oggFilename = file.filename.split(".")[0] + ".ogg";
		file.oggFilename = webServiceURL + file.oggFilename;
		file.filename = webServiceURL + file.filename;

		//console.log(file);
		$scope.trustSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		};
		$scope.file = file;
		//console.log($scope.currentItem);
		$scope.currentItem = file;

		//console.log($scope.currentItem);
		var currentIndex;
		angular.forEach($scope.files, function(file, index) {
			if (file.id == $scope.file.id) {
				//console.log(index);
				currentIndex = index;
			}
		});
		$scope.track = currentIndex;
		var tracks = $scope.files.length;
		$scope.next = function() {
			if (tracks > 0) {
				if (currentIndex == tracks - 1) {
					currentIndex = -1;
				}
				currentIndex++;
				$state.go('listen.category.subcategory.item', {
					category: $stateParams.category,
					subcategory: $stateParams.subcategory,
					id: $scope.files[currentIndex].title
				});
			}
		};
		$scope.previous = function() {
			if (tracks > 0) {
				if (currentIndex === 0) {
					currentIndex = tracks;
				}
				currentIndex--;
				$state.go('listen.category.subcategory.item', {
					category: $stateParams.category,
					subcategory: $stateParams.subcategory,
					id: $scope.files[currentIndex].title
				});

			}
		};
		//console.log("currentIndex","audioPlayer" + currentIndex);


	})
	.controller('DashboardController', function($scope, filesService, files) {
		$scope.files = files;
		$scope.refreshFiles = function() {
			filesService.getAllFiles().then(function(files) {
				$scope.files = files;
			});
		};
	})
	.controller('DashboardFileController', function($scope, $upload, $timeout, $state, filesService, file, maxFileUploadSize, webServiceURL) {
		$scope.savedSuccess = false;
		$scope.activeFile = file;
		$scope.categories = BaisMordechai.categories;
		$scope.subcategories = BaisMordechai.subcategories;
		$scope.submit = function() {
			if ($scope.fileUploadForm.$valid) {
				if ($scope.activeFile.id) {
					filesService.updateFile($scope.activeFile).then(function(file) {
						$scope.$parent.refreshFiles();
						$scope.activeFile = file;
						$scope.savedSuccess = true;
						$timeout(function() {
							$scope.savedSuccess = false;
						}, 3000);
					});
				} else {
					filesService.createFile($scope.activeFile).then(function(file) {
						$scope.$parent.refreshFiles();
						$state.go('dashboard.item', {
							id: file.id
						});
						$scope.savedSuccess = true;
						$timeout(function() {
							$scope.savedSuccess = false;
						}, 3000);
					});
				}
			} else {
				alert("Please fix required fields.");
			}
		};
		$scope.deleteFile = function() {
			if (confirm("Are you sure you want to delete " + $scope.activeFile.title + "?")) {
				filesService.deleteFile($scope.activeFile).then(function() {
					$scope.$parent.refreshFiles();
					$state.go('dashboard.item', {
						id: ""
					});
				});
			}

		};
		$scope.onFileSelect = function($file) {
			$scope.uploadProgressDisplay = 1;
			var file = $file[0];
			$scope.upload = $upload.upload({
				url: webServiceURL + 'files',
				file: file
			}).progress(function(evt) {
				var progress = parseInt(100.0 * evt.loaded / evt.total, 10);
				$scope.uploadProgressDisplay = progress;
			}).success(function(response, status, headers, config) {
				if (file.size < maxFileUploadSize) {
					$scope.activeFile.filename = file.name;
				} else {
					alert("The file you are trying to upload is too large.");
				}
			})
		// .error(function() {
		// 	alert('An error occured when trying to upload.');
		// })
				.then(function() {
					$timeout(function() {
						$scope.uploadProgressDisplay = 0;
					}, 500);
				});
		};
		$scope.uploadProgressDisplay = 0;
	});