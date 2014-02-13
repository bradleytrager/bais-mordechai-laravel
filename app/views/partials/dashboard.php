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
					<a class="list-group-item" ui-sref='dashboard.item({id: ""})' ui-sref-active="active">New</a>
					<a  ui-sref='dashboard.item({id: file.id})' ui-sref-active="active" class="list-group-item"  
					ng-repeat="file in files | filter:search |orderBy:'title'"
					ng-click="selectFile(file)">
					{{ file.title }}
				</a>
			</div>
		</div>
		<div class="col-md-8">
			<ui-view></ui-view>
		</div>
	</div>