angular.module('app.directives', [])
	.directive('jplayer', function($http, $templateCache, $compile, $parse, $rootScope) {
		return {
			restrict: 'E',
			scope: {
				title: '@',
				previous: '&',
				next: '&'
			},
			link: function(scope, element, attrs) {

				$http.get('app/templates/jplayer.html', {
					cache: $templateCache
				}).success(function(tplContent) {

					element.replaceWith($compile(tplContent)(scope));
					element.jPlayer({
						ready: function(event) {
							$(this).jPlayer("setMedia", {
								oga: attrs.src,
								mp3: attrs.src
							}).jPlayer("play");
						},
						ended: function() {
							scope.next();
						},
						swfPath: "app/vendor/jplayer/flash/",
						supplied: "mp3,oga",
						wmode: "window",
						smoothPlayBar: true,
						keyEnabled: true
					});
					$('#previous').bind("click", function() {
						scope.previous();
					});
					$('#next').bind("click", function() {
						scope.next();
					});
				});
				$rootScope.$on("$stateChangeStart", function() {
					$(element).jPlayer("destroy");
				});
			}
		};
	})
	.directive('appVersion', ['version',
		function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
			};
		}
	]);