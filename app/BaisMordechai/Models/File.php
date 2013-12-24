<?php
namespace BaisMordechai\Models;
class File extends \Eloquent  {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'files';
	protected $guarded = array('id');

}