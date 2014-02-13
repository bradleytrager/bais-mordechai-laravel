<?php

namespace BaisMordechai\FileParser\src\FileParser;

class CsvFileIterator extends FileIterator implements \Iterator
{
	public function current(){
		$file = explode(',', $this->file[$this->position]);
		return $file;
	}
	public function next(){
		++$this->position;
	}
	
}
