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


	public function get($category, $subcategory){
		return $this->file->getFilesByCategory($category, $subcategory);
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
			$file = Input::file('file');
			$filename = Input::file('file')->getClientOriginalName();
			$this->file->saveUploadedFile($file, $filename);
			
			// $id = Input::get('id');
			// if($id){
			// 	$file = File::find($id);
			// 	$file->filename = $filename;
			// 	return $this->file->getUpdateFileAttributes($id, $file->getAttributes());
			// }
			// else{
			// 	$newFile = new File();
			// 	$newFile->filename = $filename;
			// 	$newFile->title = $filename;
			// 	return $this->file->createFile($newFile->getAttributes());
			// }
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

	public function showByCategory($category, $subcategory, $id)
	{
		return $this->file->getFileByCategoryAndId($category, $subcategory, $id);
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