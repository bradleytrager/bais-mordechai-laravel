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
		umask(0755);
		$file->move($_SERVER['DOCUMENT_ROOT'].'/uploads', $filename);
		//make ogg equivalent
		$command = 'dir2ogg /var/www/bais-mordechai-laravel/public/uploads/"'.$filename.'"';
		//$command = 'echo $PATH';
		$output = $this->_pipeExec($command);
		return $output;
	}
	private function _pipeExec($cmd, $input = '')
	{
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
	}	

}



