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
    /* Have to set height explicity on ui-view 
    to prevent collapsing during animation*/
    .well[ui-view]{
        //height: 65px; 
    }

    /**
    
        TODO: Animate transitions
        - https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-animate-ui-view-with-ng-animate
        - http://stackoverflow.com/questions/20991255/angularjs-animations-with-ui-router-which-versions-work
        - http://stackoverflow.com/questions/19514445/how-can-i-use-ng-animate-with-ui-view-rather-than-ng-view
        - https://github.com/angular-ui/ui-router/issues/320
    **/
    
    .ngPartialSlideReveal.ng-enter {
      -webkit-transition: 0.5s linear all;
      -moz-transition: 0.5s linear all;
      -o-transition: 0.5s linear all;
      transition: 0.5s linear all;
      opacity: 0.5;
      position: relative;
      opacity: 0;
      top: 10px;
  }

  .ngPartialSlideReveal.ng-enter-active {
      top: 0;
      opacity: 1;
  }
  .no-gutter{
      padding-left:0;
      padding-right:0;
  }
  .no-margin-top{
      margin-top:0;
  }
  hr{
    border-top:1px solid #2c3e50;
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
                <li ng-class="{active:$stateParams.category == 'shiurim'}">
                    <a ui-sref="listen.category({category:'shiurim'})">Shiurim</a>
                </li>
                <li ng-class="{ active: $stateParams.category == 'music' }">
                    <a ui-sref="listen.category({category:'music'})">Music</a>
                </li>
                <li ng-class="{ active: $stateParams.category == 'leading_services' }">
                    <a ui-sref="listen.category({category:'leading_services'})">Leading Services</a>
                </li>
                <li ui-sref-active="active">
                    <a ui-sref="page({page:'contact'})">Contact</a>
                </li>
                <li ui-sref-active="active">
                    <a ui-sref="page({page:'about'})">About</a>
                </li>
            </ul>

        </div>
    </nav>
    <div class="container">
        <div class="row">
            <ol class="breadcrumb" ng-controller="BreadCrumbController">
                <li ng-repeat="breadcrumb in breadcrumbs">
                    <a ng-href="{{breadcrumb.url}}" ng-if="breadcrumb.url">{{breadcrumb.name |ucfirst}}</a>
                    <span ng-if="!breadcrumb.url">{{breadcrumb.name |ucfirst}}</span>
                </li>
            </ol>
        </div>
        <ui-view class="ngPartialSlideReveal"></ui-view>
    </div>
    <script type="text/javascript" src="app/vendor/jquery/jquery.js"></script>
    <script type="text/javascript" src="app/vendor/bootstrap/dist/js/bootstrap.js"></script>
    <script type="text/javascript" src="app/vendor/typeahead.js/dist/typeahead.js"></script>

    <script type="text/javascript" src="app/vendor/ng-file-upload/angular-file-upload-shim.min.js"></script> 
    <script type="text/javascript" src="app/vendor/angular/angular.js"></script>
    <script type="text/javascript" src="app/vendor/angular-route/angular-route.js"></script>
    <script type="text/javascript" src="app/vendor/angular-ui-router/release/angular-ui-router.js"></script>
    <script type="text/javascript" src="app/vendor/angular-animate/angular-animate.js"></script>
    <script type="text/javascript" src="app/vendor/ng-file-upload/angular-file-upload.js"></script>
    <script type="text/javascript" src="app/vendor/angular-typeahead/angular-typeahead.js"></script>
    <script type="text/javascript" src="app/vendor/jplayer/jquery.jplayer/jquery.jplayer.js"></script>
    <script type="text/javascript" src="app/vendor/momentjs/moment.js"></script>
    <script type="text/javascript" src="app/scripts/app.js"></script>
    <script type="text/javascript" src="app/scripts/directives.js"></script>
    <script type="text/javascript" src="app/scripts/controllers.js"></script>
    <script type="text/javascript" src="app/scripts/filters.js"></script>
    <script type="text/javascript" src="app/scripts/services.js"></script>

</body>

</html>