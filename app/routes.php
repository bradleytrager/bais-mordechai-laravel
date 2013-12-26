<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
Route::get('/', function(){
	return View::make('index');
});
Route::resource('files', 'FilesController');
Route::get('shiurim', 'FilesController@getShiurim');
Route::get('music', 'FilesController@getMusic');
Route::get('leading-services', 'FilesController@getLeadingServices');
Route::get('dashboard', function(){
	return View::make('partials/dashboard');
});