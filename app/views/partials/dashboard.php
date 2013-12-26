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
					ng-click="selectFile(file)">
					{{ file.title }}
				</a>
			</div>
		</div>
		<div class="col-md-8">
			<form role="form">
				<div class="form-group" ng-show="activeFile.id">
					<button class="btn btn-default" ng-click="clearActiveFile()">New</button>
				</div>
				<div class="form-group" >
					<span class="btn btn-default btn-file">
						Upload File
						<input type="file" ng-file-select="onFileSelect($files)" >
					</span>	
					<span>{{activeFile.filename}}</span>
				</div>
				<div class="progress progress-striped active" ng-show="uploadProgressDisplay">
					<div class="progress-bar"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: {{uploadProgressDisplay}}%">
						<span class="sr-only">45% Complete</span>
					</div>
				</div>	
				<div class="form-group">
					<label for="titleInput">Title</label>
					<input type="text" id="titleInput" class="form-control" ng-model="activeFile.title"/>
				</div>
				<div class="form-group">
					<label for="descriptionInput">Category</label>
					<input type="text" id="categoryInput" class="form-control" ng-model="activeFile.category" />
				</div>
				<div class="form-group">
					<label for="descriptionInput">Subcategory</label>
					<input type="text" id="subcategoryInput" class="form-control" ng-model="activeFile.subcategory" />
				</div>
				<div class="form-group">
					<label for="descriptionInput">Description</label>
					<textarea id="descriptionInput" class="form-control" ng-model="activeFile.description" style="height:150px"></textarea>			
				</div>
				<button class="btn btn-default" ng-click="submit()">Save</button>
			</form>
		</div>
	</div>