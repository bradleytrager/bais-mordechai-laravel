app.directive('jplayer', function($http, $templateCache, $compile, $parse) {
	return {
		restrict: 'E',
		scope:{
			title:'@'
		},
		link: function(scope, element, attrs) {

			$http.get('app/templates/jplayer.html', {
				cache: $templateCache
			}).success(function(tplContent) {
				element.replaceWith($compile(tplContent)(scope));
				element.jPlayer({
					ready: function(event) {
						$(this).jPlayer("setMedia", {
							m4a: attrs.src,
							oga: "http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
						});
					},
					swfPath: "app/vendor/jplayer/jquery.jplayer",
					supplied: "m4a, oga",
					wmode: "window",
					smoothPlayBar: true,
					keyEnabled: true
				});
			});
		}
	};
});
