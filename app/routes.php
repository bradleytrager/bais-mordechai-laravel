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
//dd(ini_get(phpinfo()));
/*
Handle cross-domain requests
see http://stackoverflow.com/questions/14414896/laravel-handling-the-option-http-method-request
 */
// header('Access-Control-Allow-Origin: '. $_SERVER['HTTP_ORIGIN'] );
if(isset($_SERVER['HTTP_ORIGIN'])){
	$origin = $_SERVER['HTTP_ORIGIN'];
}
else{
	$origin = '*';
}
header('Access-Control-Allow-Origin: '. $origin );
header('Access-Control-Allow-Credentials: true' );
header('Access-Control-Request-Method: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *,x-requested-with,Content-Type');
header('X-Frame-Options: DENY');
// header('Access-Control-Allow-Origin : http://bais-mordechai.com');
// header('Access-Control-Allow-Origin : http://www.bais-mordechai.com');
// header('Access-Control-Allow-Origin : http://localhost');
// header('Access-Control-Allow-Methods : POST, GET, OPTIONS, PUT, DELETE');
// header('Access-Control-Allow-Headers : X-Requested-With, content-type');
// header('Access-Control-Allow-Credentials: true');
Route::get('python', function(){
		$cmd = 'dir2ogg --help';
		$input = '';
		$proc = proc_open($cmd, array(0 => array('pipe', 'r'), 1 => array('pipe', 'w'), 2 => array('pipe', 'w')), $pipes);
		fwrite($pipes[0], $input);
		fclose($pipes[0]);
		$stdout = stream_get_contents($pipes[1]);
		fclose($pipes[1]);
		$stderr = stream_get_contents($pipes[2]);
		fclose($pipes[2]);
		$rtn = proc_close($proc);
		$result = array(
		                'stdout' => $stdout
		                , 'stderr' => $stderr
		                , 'return' => $rtn
		                );
		return $result;
});

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
	return $files->where("created_at", ">", $new_time)->orderBy("created_at", "desc")->limit(3)->get();
});


//Mail::pretend();

	Route::post('contact', function(){
		$data=Input::all();
		Mail::send('emails.contact', $data, function($message) use ($data)
		{
			$message->from($data["email"]);
			$message->to('binyomintrager@gmail.com', 'Binyomin Trager');
			$message->subject($data["subject"]);
		});
		return $data;
	});

	App::missing(function($exception)
	{
		return "Sorry, the page you are looking for does not exist.";
	});
