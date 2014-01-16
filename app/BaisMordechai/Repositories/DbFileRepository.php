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
		$files = $files->orderBy('display_order')->orderBy('created_at');
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

	public function getFileByCategoryAndTitle($category, $subcategory, $title){
		$file = new File();

		$file = $file->where('category', $category);
		if($subcategory != 'all'){
			$file = $file->where('subcategory', $subcategory);
		}
		$file = $file->where('title', $title);
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
	public function deleteFile($id){
		$file = File::find($id);
		$file->delete();
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
		$file->move($_SERVER['DOCUMENT_ROOT'].'/uploads', $filename);
		//make ogg equivalent
		$command = 'dir2ogg /var/www/bais-mordechai-laravel/public/uploads/"'.$filename.'"';
		$output = exec($command);
		echo "output = ".$output.", command = ".$command;
		//return "file saved";
	}

}



