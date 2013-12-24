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


	public function getFilesByCategory($category, $subcategory=null){
		$files = File::where('category', $category);

		if($subcategory){
			$files->where('subcategory', $subcategory);
		}

		return $files->get();
	}
	public function updateFile($id, $updatedFile){
		$file = File::find($id);
		//dd($file);
		$file->fill($updatedFile);
		$file->save();
		return "saved";
	}

}



