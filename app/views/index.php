<html ng-app="baisMordechai">
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="app/css/bootstrap.css">

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

				<table class="table table-bordered table-striped">
					<tbody ng-repeat="file in files | filter:search |orderBy:'title'" >
						<tr ng-class="{active: isActive(file)}" ng-click="getFile(file.id)">
							<td>
								<a href="" >
									{{ file.title }}
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="col-md-8">
				{{activeFile.title}}
			</div>
		</div>
	</div>
	<script type="text/javascript" src="app/vendor/angular/angular.js"></script>
    <script type="text/javascript" src="app/vendor/angular-ui-router/release/angular-ui-router.js"></script>
	<script type="text/javascript" src="app/scripts/main.js"></script>
	</html>