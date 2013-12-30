app.filter('ucfirst', function() {
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
});