<?php
namespace BaisMordechai\Repositories;

use BaisMordechai\Models\File;

class DbFileRepository implements FileRepositoryInterface{
	
	public function getAll(){
		$files = File::all();
		return $files;
	}
	public function getFilesByCategory($category, $subcategory=null){
		$files = File::where('category', $category);

		if($subcategory){
			$files->where('subcategory', $subcategory);
		}

		return $files->get();
	}

}



