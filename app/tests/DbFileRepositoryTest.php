<?php
use BaisMordechai\Repositories\DbFileRepository;

class DbFileRepositoryTest extends \TestCase {
	protected $file;

	public function __construct(){
		$this->file = new DbFileRepository;
	}

	public function testGetAll()
	{
		$file = new DbFileRepository;
		$this->assertInstanceOf('BaisMordechai\Repositories\DbFileRepository', $this->file);
	}
}