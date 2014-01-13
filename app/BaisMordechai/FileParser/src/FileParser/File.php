<?php

namespace BaisMordechai\FileParser\src\FileParser;

class File implements \IteratorAggregate
{
	protected $filename;

	public function __construct($filename)
	{
		$this->filename = $filename;
		$fileIterator = $this->getIterator();
	}

	/**
	 * Provides the proper iterator class based on file type
	 * e.i. .csv, .nl
	 * @return Iterator
	 */
	public function getIterator(){
		$format = explode('.', $this->filename)[1];

        // construct our class name and check its existence  
		$fileIteratorClass= "BaisMordechai\\FileParser\\src\\FileParser\\". ucfirst($format). "FileIterator";

		if(class_exists($fileIteratorClass)) {  
            // return a new Iterator object  
			return new $fileIteratorClass($this->filename);  
		}  

        // If no iterator is found for the file format
		throw new \Exception('Unsupported file format "'.$format.'"');  

	}
}
