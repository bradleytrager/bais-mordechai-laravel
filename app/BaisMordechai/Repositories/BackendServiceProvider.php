<?php
namespace BaisMordechai\Repositories;
use Illuminate\Support\ServiceProvider;

class BackendServiceProvider extends ServiceProvider{
	
	public function register(){
		$this->app->bind(
		     'BaisMordechai\Repositories\FileRepositoryInterface',
		     'BaisMordechai\Repositories\DbFileRepository'
	     );
	}
}