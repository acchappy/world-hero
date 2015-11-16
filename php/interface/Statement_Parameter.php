<?php
class Statement_Parameter 
{ 
    private $_array = array(); 
	private $array  = array();
     
    public function __constructor() 
    {
    }
     
    public function Get_Type_String() 
    {
        $types = "";    
     
        foreach ( $this->_array as $name => $la )
	    {
            $types .= $la['type'];
	    }

		foreach ( $this->array as $name => $la )
	    {
            $types .= $la['type'];
	    }
         
        return $types; 
    }

    public function Set_Parameter( $name, $value ) 
    { 
        if ( !isset( $this->_array[$name] ) )
        {
			$this->_array[$name] = array();
            $this->_array[$name]["value"] = $value;
			if ( is_int( $value ) ) 
		    {
			    $this->_array[$name]["type"] = 'i'; 
		    }
		    else if ( is_double( $value ) )
		    {
			    $this->_array[$name]["type"] = 'd'; 
		    }
		    else
		    { 
			    $this->_array[$name]["type"] = 's'; 
		    }
        }
    }

	public function _Set_Parameter( $name, $value ) 
    { 
        if ( !isset( $this->array[$name] ) )
        {
			$this->array[$name] = array();
            $this->array[$name]["value"] = $value;
			if ( is_int( $value ) ) 
		    {
			    $this->array[$name]["type"] = 'i'; 
		    }
		    else if ( is_double( $value ) )
		    {
			    $this->array[$name]["type"] = 'd'; 
		    }
		    else
		    { 
			    $this->array[$name]["type"] = 's'; 
		    }
        }
    }
     
    public function Bind_Params( &$stmt )
    { 
        $ar = Array();
         
        $ar[] = $this->Get_Type_String();

		foreach ( $this->_array as $name => $la )
		{
            $ar[] = &$this->_array[$name]['value'];
		}

		foreach ( $this->array as $name => $la )
		{
            $ar[] = &$this->array[$name]['value'];
		}
         
        return call_user_func_array( array( $stmt, 'bind_param' ), $ar ); 
    } 
} 

class Statement_Parameter_Type 
{
    public static $STATEMENT_TYPE_INTEGER = 'i';
    public static $STATEMENT_TYPE_DOUBLE  = 'd';
    public static $STATEMENT_TYPE_STRING  = 's';
    public static $STATEMENT_TYPE_BLOB    = 'b';
} 
?>