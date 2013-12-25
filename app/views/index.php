<html ng-app="baisMordechai">
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="app/css/bootstrap.css">
	<style type="text/css">
	body{
		padding-top: 80px;
	}
	.files-table tr{
		cursor: pointer;
	}
	.files-table tr:hover a{
		text-decoration: underline;
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
			<a class="navbar-brand" href="#">BaisMordechai Admin</a>
		</div>
		<!-- Collect the nav links, forms, and other content for toggling -->
		<!-- <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li class="active"><a href="#">Browse/Edit</a></li>
				<li><a href="#">Add New</a></li>
			</ul>
		</div> -->
	</nav>
	<ng-view></ng-view>
	
<script type="text/javascript" src="app/vendor/jquery/jquery.js"></script>
<script type="text/javascript" src="app/js/bootstrap.js"></script>
<script type="text/javascript" src="app/vendor/ng-file-upload/angular-file-upload-shim.min.js"></script> 
<script type="text/javascript" src="app/vendor/angular/angular.js"></script>
<script type="text/javascript" src="app/vendor/angular-route/angular-route.js"></script>
<script type="text/javascript" src="app/vendor/angular-ui-router/release/angular-ui-router.js"></script>
<script type="text/javascript" src="app/vendor/ng-file-upload/angular-file-upload.js"></script>
<script type="text/javascript" src="app/scripts/main.js"></script>
</body>
</html>