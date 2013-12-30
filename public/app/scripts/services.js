app.service("files", function($http, $q) {
	this.getFileByCategory = function(category, subcategory, id) {
		var deferred = $q.defer();

		$http.get('/files/' + category + '/' + subcategory + '/' + id).success(function(file) {
			//TODO redirect if nothing is returned
			var path = 'uploads/';
			file.filename = path + file.filename;
			deferred.resolve(file);
		});

		return deferred.promise;
	};

	this.getFilesByCategory = function(category, subcategory){
		var deferred = $q.defer();

		$http.get('/files/' + category + '/' + subcategory).success(function(files) {
			deferred.resolve(files);
		});

		return deferred.promise;
	};
});