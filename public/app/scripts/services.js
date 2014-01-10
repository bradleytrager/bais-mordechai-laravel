angular.module('app.services', [])
	.constant('webServiceURL', "http://localhost:8000")
	.constant('maxFileUploadSize', 35000000)
	/**
	 * Prevent auto-scrolling to top on state change
	 * https://github.com/angular-ui/ui-router/issues/110#issuecomment-18052396
	 */
	.value('$anchorScroll', angular.noop)
	.service("filesService", function($http, $q, webServiceURL) {
		this.getFileByCategory = function(category, subcategory, id) {
			var deferred = $q.defer();
			$http.get(webServiceURL + '/files/' + category + '/' + subcategory + '/' + id).success(function(file) {
				var path = 'uploads/';
				file.filename = path + file.filename;
				deferred.resolve(file);
			});

			return deferred.promise;
		};

		this.getFilesByCategory = function(category, subcategory) {
			return $http.get(webServiceURL + '/files/' + category + '/' + subcategory).then(function(response) {
				return response.data;
			});
		};

		this.getAllFiles = function() {
			return $http.get(webServiceURL + '/files').then(function(response) {
				return response.data;
			});
		};

		this.getFileById = function(id) {
			if (id) {
				return $http.get(webServiceURL + '/files/' + id).then(function(response) {
					return response.data;
				});
			} else {
				return {}; //In this case we are creating a new file
			}

		};

		this.createFile = function(file) {
			return $http.post(webServiceURL +"/files", file).then(function(response) {
				return response.data;
			});
		};

		this.updateFile = function(file) {
			return $http.put(webServiceURL +"/files/" + file.id, file).then(function(response) {
				return response.data;
			});
		};

		this.deleteFile = function(file) {
			return $http.delete(webServiceURL +"/files/" + file.id);
		};
	})
	.service('breadcrumbService', function($rootScope, filesService) {
		this.getBreadcrumbs = function($state, $stateParams) {
			var breadcrumbs = [];

			var states = (function() {
				var states = [];
				angular.forEach($state.get(), function(state) {
					if (!state.abstract) {
						states.push(state);
					}
				});
				return states;
			})();

			var getName = function(stateName) {
				var stateNameMapping = {
					"home": function() {
						return "Home";
					},
					"dashboard": function() {
						return "Dashboard";
					},
					"dashboard.item": function() {
						return $stateParams.id ? $stateParams.id : "New";
					},
					"listen.category": function() {
						return $stateParams.category;
					},
					"listen.category.subcategory": function() {
						return $stateParams.subcategory;
					},
					"listen.category.subcategory.item": function() {
						return $stateParams.id;
					},
					"page": function() {
						return $stateParams.page;
					},
					"page.subpage": function() {
						return $stateParams.subpage;
					}
				};
				return stateNameMapping[stateName]();
			};

			angular.forEach(states, function(state) {
				if ($state.includes(state.name) && (state.name != $state.current.name)) {
					breadcrumbs.push({
						name: getName(state.name),
						url: $state.href(state.name)
					});
				}
			});

			breadcrumbs.push({
				name: getName($state.current.name)
			});

			return breadcrumbs;
		};
	});