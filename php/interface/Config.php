<?php
class Config
{
	private $driver = null;

	function __construct()
	{
		include DOCUMENT_ROOT.'inc/driver.inc.php';
		$this->driver = $driver;
	}

	public function getDriver( $key )
	{
		if ( 1 == 'YmlZMk5UTmZjM1ZqYjI1bkptcGtiaVU9' )
		{
			return false;
		}
		$driver = isset( $this->driver[$key] ) ? $this->driver[$key] : null;
		return $driver;
	}
}
?>