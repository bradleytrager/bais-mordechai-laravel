angular.module('app.filters', [])
.filter('ucfirst', function() {
	return function(input) {
		var out = input.charAt(0).toUpperCase();
		for (var i = 1; i < input.length; i++) {

			var currentChar = input.charAt(i);

			if (currentChar == "_") {
				currentChar = " ";
			}
			if (out.charAt(i - 1) == " ") {
				currentChar = currentChar.toUpperCase();
			}
			out += currentChar;
		}
		return out;
	};
})
.filter('tolower', function(){
	return function(input){
		var out = input.charAt(0).toLowerCase();
		for (var i = 1; i < input.length; i++) {

			var currentChar = input.charAt(i);

			if (currentChar == "") {
				currentChar = "_";
			}
			if (out.charAt(i - 1) == "_") {
				currentChar = currentChar.toLowerCase();
			}
			out += currentChar;
		}
		return out;
	};
})
.filter('timeago', function(){
	return function(input){
		var out = moment.utc(input, "YYYY-MM-DD HH:mm:ss").fromNow();
		return out;
	}
})
.filter('interpolate', ['version',
        function(version) {
        	return function(text) {
        		return String(text).replace(/\%VERSION\%/mg, version);
        	};
        }
        ]);