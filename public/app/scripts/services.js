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
});