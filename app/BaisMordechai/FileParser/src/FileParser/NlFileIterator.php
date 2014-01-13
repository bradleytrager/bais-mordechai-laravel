<?php

namespace FileParser;

class NlFileIterator extends FileIterator implements \Iterator
{
	private $linesPerItem = 4;
	public function current(){
		$file = array();
		for($i = 0; $i < $this->linesPerItem; $i++){
			$file[] = $this->file[$this->position + $i];
		}
		return $file;
	}

	public function next(){
		$this->position += $this->linesPerItem;
	}
	
}
