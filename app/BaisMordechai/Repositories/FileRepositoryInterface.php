<?php
namespace BaisMordechai\Repositories;

use BaisMordechai\Models\File;

interface FileRepositoryInterface{
	public function getAll();
	public function getFileById($id);
	public function getFilesByCategory($category, $subcategory);
	public function getFileByCategoryAndId($category, $subcategory, $id);
	public function createFile($newFile);
	public function updateFile($id, $file);
	public function getUpdateFileAttributes($id, $updatedFile);//Doesn't update db
	public function saveUploadedFile($file, $filename);
}



