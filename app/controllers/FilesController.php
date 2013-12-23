<?php
use BaisMordechai\Models\File;
use BaisMordechai\Repositories\FileRepositoryInterface;
class FilesController extends \BaseController {

	public function __construct(FileRepositoryInterface $file){
		$this->file = $file;
	}
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$files = $this->file->getAll();
		return $files;
	}


	
	public function getShiurim(){
		$subcategory = null;

		if(isset($_GET['parashah'])){
			$subcategory=$_GET['parashah'];
		}
		$shiurim = $this->file->getFilesByCategory('Shiurim', $subcategory);
		//dd(DB::getQueryLog());
		return $shiurim;
	}

	public function getMusic(){
		return $this->file->getFilesByCategory('Music');
	}

	public function getLeadingServices(){
		return $this->file->getFilesByCategory('Leading Services');
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}