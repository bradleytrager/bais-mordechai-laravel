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


Route::resource('files', 'FilesController', array('only' => array('index', 'show')));

Route::get('files/{category}/{subcategory}', 'FilesController@get');
Route::get('files/{category}/{subcategory}/{title}', 'FilesController@showByCategory');

Route::post('files', array('uses' => 'FilesController@store',
                                        'as' => 'files.store'))->before('auth.basic');
Route::put('files/{files}', array('uses' => 'FilesController@update', 'as'=>'files.update'))->before('auth.basic');
Route::delete('files/{files}', array('uses' => 'FilesController@destroy', 'as'=>'files.destroy'))->before('auth.basic');

Route::get('dashboard', function(){
	return View::make('partials/dashboard');
})->before('auth.basic');