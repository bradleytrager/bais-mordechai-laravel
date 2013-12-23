<?php
namespace BaisMordechai\Repositories;

use BaisMordechai\Models\File;

interface FileRepositoryInterface{
	public function getAll();
	public function getFileById($id);
	public function getFilesByCategory($category, $subcategory);
}



