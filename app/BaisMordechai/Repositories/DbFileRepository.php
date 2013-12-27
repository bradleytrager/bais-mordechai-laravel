<?php
namespace BaisMordechai\Repositories;

use BaisMordechai\Models\File;

class DbFileRepository implements FileRepositoryInterface{
	
	public function getAll(){
		$files = File::all();
		return $files;
	}

	public function getFileById($id){
		$file = File::where('id', $id);
		return $file->first();
	}


	public function getFilesByCategory($category, $subcategory){
		$files = File::where('category', $category);

		if($subcategory != 'all'){
			$files->where('subcategory', $subcategory);
		}

		return $files->get();
	}

	public function getFileByCategoryAndId($category, $subcategory, $id){
		$file = new File();

		$file = $file->where('category', $category);
		if($subcategory != 'all'){
			$file = $file->where('subcategory', $subcategory);
		}
		$file = $file->where('id', $id);
		return $file->first();
	}

	public function createFile($newFile){
		$file = new File();
		$file->fill($newFile);
		$file->save();
		return $file->getAttributes();
	}

	public function updateFile($id, $updatedFile){
		$file = File::find($id);
		$file->fill($updatedFile);
		$file->save();
		return $file->getAttributes();
	}
	public function getUpdateFileAttributes($id, $updatedFile){
		$file = File::find($id);
		$file->fill($updatedFile);
		//$file->save();
		return $file->getAttributes();
	}
	public function saveUploadedFile($file, $filename){
		$originalFileName = $file->getClientOriginalName();
		$clientOriginalExtension = $file->getClientOriginalExtension();
		$file->move('public/uploads', $filename);
		return "file saved";
	}

}



