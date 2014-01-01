app.service("filesService", function($http, $q) {
	this.getFileByCategory = function(category, subcategory, id) {
		var deferred = $q.defer();
		$http.get('/files/' + category + '/' + subcategory + '/' + id).success(function(file) {
			var path = 'uploads/';
			file.filename = path + file.filename;
			deferred.resolve(file);
		});

		return deferred.promise;
	};

	this.getFilesByCategory = function(category, subcategory) {
		return $http.get('/files/' + category + '/' + subcategory).then(function(response) {
			return response.data;
		});
	};

	this.getAllFiles = function() {
		return $http.get('/files').then(function(response) {
			return response.data;
		});
	};

	this.getFileById = function(id) {
		if (id) {
			return $http.get('/files/' + id).then(function(response) {
				return response.data;
			});
		} else {
			return {}; //In this case we are creating a new file
		}

	};

	this.createFile = function(file) {
		return $http.post("/files", file).then(function(response) {
			return response.data;
		});
	};

	this.updateFile = function(file) {
		return $http.put("/files/" + file.id, file).then(function(response) {
			return response.data;
		});
	};

	this.uploadFile = function(file) {

	};
});
app.service('breadcrumbService', function($rootScope) {
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
					return "Dashbord";
				},
				"dashboard.item": function() {
					return "dashboard.item";
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