<?php

namespace BaisMordechai\FileParser\src\FileParser;

/**
 * Base Class for different file iterator types
 */
abstract class FileIterator
{
	protected $file;
	protected $position;

	public function __construct($filename)
	{
		$this->position = 0;
		$file = fopen($_SERVER['DOCUMENT_ROOT']."/".$filename, "r");
		$fileBuffer = array();

		while(!feof($file))
		{
			$fileBuffer[] = trim(fgets($file));
		}
		fclose($file);

		$this->file = $fileBuffer;

	}

	public function getLengthofFile()
	{
		return sizeof($this->file);
	}

	/**
	 * functions required by the Iterator interface
	 * 
	 */
	public function key(){
		return $this->position;
	}

	public function rewind(){
		$this->position = 0;
	}
	public function valid(){
		return isset($this->file[$this->position]);
	}

}
