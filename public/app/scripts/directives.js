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
								//oga: attrs.src,
								mp3: attrs.src
							}).jPlayer("play");
						},
						ended: function() {
							scope.next();
						},
						swfPath: "app/vendor/jplayer/flash/",
						supplied: "mp3", //,oga",
						wmode: "window",
						smoothPlayBar: true,
						keyEnabled: true
					});
					$('#previous').bind("click", function() {
						scope.previous();
					});
					$('#next').bind("click", function() {
						scope.next();
						$(element).jPlayer("play");
					});
				});
				$rootScope.$on("$stateChangeStart", function() {
					$(element).jPlayer("pause");
				});
				element.bind('ended', function() {
					//console.log("ended");
					scope.next();
					$(element).jPlayer("play");
				});
			}
		};
	})
	.directive('jplaylist', function($http, $templateCache, $compile, $parse, $rootScope, $stateParams, $state, $timeout) {
		return {
			restrict: 'E',
			scope: {
				playlist: '=',
				track: '='
			},
			link: function(scope, element, attrs) {
				//debugger;
				var self = this;
				console.log("start link()");
				$http.get('app/templates/jplaylist.html', {
					cache: $templateCache
				}).success(function(tplContent) {
					element.replaceWith($compile(tplContent)(scope));

					myPlaylist = new jPlayerPlaylist({
						jPlayer: "#jquery_jplayer_N",
						cssSelectorAncestor: "#jp_container_N"
					}, scope.playlist, {
						playlistOptions: {
							enableRemoveControls: true,
							//autoPlay:true,
							displayTime: 0,
							addTime: 0,
							removeTime: 0
						},
						swfPath: "app/vendor/jplayer/flash/",
						supplied: "oga, mp3",
						smoothPlayBar: true,
						keyEnabled: true,
						audioFullScreen: true
					});
					var track;
					var getTrack = function() {
						angular.forEach(scope.playlist, function(file, index) {
							if (file.title == $stateParams.id) {
								//console.log(index);
								track = index;
							}
						});
					};
					var play = function(track) {
						myPlaylist.play(track);
					};
					getTrack();
					play(track);
					$rootScope.$on('$stateChangeSuccess', function() {
						if ($state.includes('subcategory.item') && myPlaylist.playlist[myPlaylist.current].title != $stateParams.id) {
							getTrack();
							play(track);
						} else if ($state.is('subcategory')) {
							myPlaylist.pause();
						}

					});
					myPlaylist.select = function(index) {
						console.log("myPlaylist.select()");
						index = (index < 0) ? this.original.length + index : index; // Negative index relates to end of array.
						if (0 <= index && index < this.playlist.length) {
							this.current = index;
							this._highlight(index);
							$(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[this.current]);
						} else {
							this.current = 0;
						}
						if (this.playlist[this.current].title != $stateParams.id) {
							//debugger;
							$state.go('subcategory.item', {
								category: $stateParams.category,
								subcategory: $stateParams.subcategory,
								id: this.playlist[this.current].title
							});
						}

					};
				});
			}
		};
	})
// .directive("playlist", function() {
// 	return {
// 		restrict: 'A',
// 		scope: {
// 			next: "&",
// 			play: "&"
// 		},
// 		link: function(scope, element, attrs) {
// 			//element[0].pause();
// 			//console.log(element);
// 			// element.bind('click', function() {
// 			// 	scope.play();
// 			// });
// 			// element.bind('play', function() {
// 			// 	scope.play();
// 			// });
// 			element.bind('ended', function() {
// 				//console.log("ended");
// 				scope.next();
// 			});
// 			// element.addEventListener("ended", function(){
// 			// 	console.log("ended");
// 			// 	scope.next();
// 			// });
// 		}
// 	};
// })
.directive('appVersion', ['version',
	function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}
]);