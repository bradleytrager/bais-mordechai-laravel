<?php
namespace BaisMordechai\Repositories;

use BaisMordechai\Models\File;

interface FileRepositoryInterface{
	public function getAll();
	public function getFilesByCategory($category, $subcategory);
}



