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
		
		return $this->file->getFilesByCategory('Shiurim', $subcategory);
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
		if (Input::hasFile('file'))
		{
			$filename = Input::file('file')->getClientOriginalName();
			$id = Input::get('id');
			if($id){
				$file = File::find($id);
				$file->filename = $filename;
				$this->file->updateFile($id, $file->getAttributes());
			}
			else{
				$newFile = new File();
				$newFile->filename = $filename;
				$newFile->title = $filename;
				$this->file->createFile($newFile->getAttributes());
			}
			$file = Input::file('file');
			$this->file->saveUploadedFile($file, $filename);
		}
		else{
			$newFile = Input::all();
			return $this->file->createFile($newFile);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return $this->file->getFileById($id);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$updatedFile = Input::all();
		return $this->file->updateFile($id, $updatedFile);
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