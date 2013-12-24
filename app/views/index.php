<html ng-app="baisMordechai">
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="app/css/bootstrap.css">
	<style type="text/css">
	.files-table tr{
		cursor: pointer;
	}
	.files-table tr:hover a{
		text-decoration: underline;
	}
	</style>
</head>
<body ng-controller="FilesController">
	<div class="container">
		<div class="row">
			<div class="col-md-4">
				
				<form class="form-horizontal" role="form">
					<div class="form-group">
						<label for="search" class="col-md-2 control-label">Search</label>
						<div class="col-sm-10">
							<input type="text" id="search" class="form-control" placeholder="Search Files" ng-model="search">
						</div>
					</div>
				</form>

				<div class="list-group"  >
					<a href="" class="list-group-item" ng-class="{active: isActive(file)}" 
					ng-repeat="file in files | filter:search |orderBy:'title'"
					ng-click="getFile(file.id)">
						{{ file.title }}
					</a>
				</div>
			</div>
			<div class="col-md-8">
				<form>
					<input type="text" ng-model="activeFile.title"/>
					<textarea ng-model="activeFile.description"></textarea>
					<button ng-click="submit()">Save</button>
				</form>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="app/vendor/angular/angular.js"></script>
	<script type="text/javascript" src="app/vendor/angular-ui-router/release/angular-ui-router.js"></script>
	<script type="text/javascript" src="app/scripts/main.js"></script>
</body>
</html>