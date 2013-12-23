<?php
use BaisMordechai\Models\File;
class ExampleTest extends TestCase {

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testBasicExample()
	{
		$crawler = $this->client->request('GET', '/');

		$this->assertTrue($this->client->getResponse()->isOk());
		//$this->assertRedirectedTo("files");
	}

	public function testFileModel(){
		$file = new File();
		$this->assertInstanceOf('BaisMordechai\Models\File', $file);

	}

}