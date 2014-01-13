<?php
use BaisMordechai\Models\File;
use Carbon\Carbon;
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

/*
Handle cross-domain requests
see http://stackoverflow.com/questions/14414896/laravel-handling-the-option-http-method-request
 */
header('Access-Control-Allow-Origin : *');
header('Access-Control-Allow-Methods : POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers : X-Requested-With, content-type');

Route::get('/', function(){
	return View::make('index');
});
Route::resource('files', 'FilesController', array('only' => array('index', 'show')));
Route::get('files/{category}/{subcategory}', 'FilesController@get');
Route::get('files/{category}/{subcategory}/{title}', 'FilesController@showByCategory');

Route::group(array('before' => 'auth.basic'), function()
{
	Route::post('files', array('uses' => 'FilesController@store',
	            'as' => 'files.store'));
	Route::put('files/{files}', array('uses' => 'FilesController@update', 'as'=>'files.update'));
	Route::delete('files/{files}', array('uses' => 'FilesController@destroy', 'as'=>'files.destroy'));

	Route::get('dashboard', function(){
		return View::make('partials/dashboard');
	});
});

Route::get('current_parashah', function(){
	$file = new BaisMordechai\FileParser\src\FileParser\File('fullkriyah.csv');
	$now = Carbon::now();
	foreach ($file as $key => $value) {
		$date = new Carbon($value[0]);
		if($now->lt($date)){
			return $value[1];
		}
	}

	//Default if nothing is returned
	return "Bereishit";
});

Route::get('whats_new', function(){
	$new_time = Carbon::now()->subDays(14);
	$files = new File();
	return $files->where("created_at", ">", $new_time)->orderBy("created_at", "desc")->limit(2)->get();
});


//Mail::pretend();

Route::post('contact', function(){
	$data=Input::all();

	Mail::send('emails.contact', $data, function($message) use ($data)
	{
		$message->from($data["email"]);
		$message->to('binyomintrager@gmail.com')->cc('bradleytrager@gmail.com');
		$message->subject($data["subject"]);
	});
	return $data;
});
Route::get("uploads/{filename}", function(){
	header('Content-Type:audio/mpeg');
	return "hello";
});
App::missing(function($exception)
{
	return "Sorry, the page you are looking for does not exist.";
});
