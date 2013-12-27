<html ng-app="baisMordechai" ng-controller="AppController">
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="app/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="app/vendor/jplayer/skin/blue.monday/jplayer.blue.monday.css"  />

	<style type="text/css">
	body{
		padding-top: 80px;
	}
	.btn-file {
		position: relative;
		overflow: hidden;
	}
	.btn-file input[type=file] {
		position: absolute;
		top: 0;
		right: 0;
		min-width: 100%;
		min-height: 100%;
		font-size: 999px;
		text-align: right;
		filter: alpha(opacity=0);
		opacity: 0;
		background: red;
		cursor: inherit;
		display: block;
	}
	.col-centered{
		float: none;
		margin: 0 auto;
	}

	</style>
</head>
<body>
	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">BaisMordechai</a>
		</div>
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li ui-sref-active="active"><a ui-sref="shiurim">Shiurim</a></li>
				<li ui-sref-active="active"><a ui-sref="music">Music</a></li>
				<li ui-sref-active="active"><a ui-sref="leading-services">Leading Services</a></li>
				<li ui-sref-active="active"><a ui-sref="contact">Contact</a></li>
				<li ui-sref-active="active"><a ui-sref="about">About</a></li>
			</ul>

		</div>
	</nav>
	<div class="container">
		<ui-view></ui-view>
	</div>
	<script type="text/javascript" src="app/vendor/jquery/jquery.js"></script>
	<script type="text/javascript" src="app/vendor/bootstrap/dist/js/bootstrap.js"></script>
	<script type="text/javascript" src="app/vendor/ng-file-upload/angular-file-upload-shim.min.js"></script> 
	<script type="text/javascript" src="app/vendor/angular/angular.js"></script>
	<script type="text/javascript" src="app/vendor/angular-route/angular-route.js"></script>
	<script type="text/javascript" src="app/vendor/angular-ui-router/release/angular-ui-router.js"></script>
	<script type="text/javascript" src="app/vendor/ng-file-upload/angular-file-upload.js"></script>
	<script type="text/javascript" src="app/vendor/jplayer/jquery.jplayer/jquery.jplayer.js"></script>
	<script type="text/javascript" src="app/scripts/main.js"></script>
	<script type="text/javascript" src="app/scripts/directives.js"></script>
	<script type="text/javascript" src="app/scripts/controllers.js"></script>

</body>

</html>