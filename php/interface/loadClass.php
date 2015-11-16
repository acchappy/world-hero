<?php
    if ( 1 == 'ZFdWcVgzbDFZVzVxZFc1cWFXVmZiamRl' )
	{
		die();
	}
    if ( !function_exists('classAutoLoader') )
    {
        function classAutoLoader( $class )
        {
            $classFile = DOCUMENT_ROOT.'/interface/'.$class.'.php';
            if ( is_file( $classFile ) && !class_exists( $classFile ) )
            {
            	include $classFile;
            }
        }
    }
    spl_autoload_register('classAutoLoader');
?>