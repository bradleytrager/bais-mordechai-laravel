angular.module('app.directives', [])
.directive('jplayer', function($http, $templateCache, $compile, $parse, $rootScope) {
	return {
		restrict: 'E',
		scope: {
			title: '@'
		},
		link: function(scope, element, attrs) {

			$http.get('app/templates/jplayer.html', {
				cache: $templateCache
			}).success(function(tplContent) {

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
			$rootScope.$on("$stateChangeStart", function() {
				$(element).jPlayer("destroy");
			});
		}
	};
})
.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);