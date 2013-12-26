app.directive('jplayer', function($http, $templateCache, $compile, $parse, $rootScope) {
	return {
		restrict: 'E',
		scope: {
			title: '@'
		},
		link: function(scope, element, attrs) {

			$http.get('app/templates/jplayer.html', {
				cache: $templateCache
			}).success(function(tplContent) {
				$(element).jPlayer( "destroy" );
				element.replaceWith($compile(tplContent)(scope));
				element.jPlayer({
					ready: function(event) {
						$(this).jPlayer("setMedia", {
							mp3: attrs.src
						});
					},
					swfPath: "app/vendor/jplayer/jquery.jplayer",
					supplied: "mp3",
					wmode: "window",
					smoothPlayBar: true,
					keyEnabled: true
				});
			});

			
		}
	};
});