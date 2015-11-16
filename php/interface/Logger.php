<?php
define( 'LogLevel_EMERGENCY', 0 );
define( 'LogLevel_ALERT',     1 );
define( 'LogLevel_CRITICAL',  2 );
define( 'LogLevel_ERROR',     3 );
define( 'LogLevel_WARNING',   4 );
define( 'LogLevel_NOTICE',    5 );
define( 'LogLevel_INFO',      6 );
define( 'LogLevel_DEBUG',     7 );

class Logger
{
    protected $options = array (
        'extension'      => 'log',
        'dateFormat'     => 'Y-m-d H:i:s',
        'filename'       => false,
        'flushFrequency' => false,
        'prefix'         => 'log_',
        'logFormat'      => false,
        'appendContext'  => true
    );

    private $logFilePath;

    protected $logLevelThreshold = LogLevel_DEBUG;

	private $logLevels = array(
		LogLevel_EMERGENCY => 0,
		LogLevel_ALERT     => 1,
		LogLevel_CRITICAL  => 2,
		LogLevel_ERROR     => 3,
		LogLevel_WARNING   => 4,
		LogLevel_NOTICE    => 5,
		LogLevel_INFO      => 6,
		LogLevel_DEBUG     => 7
	);

    private $logLineCount = 0;

    private $fileHandle;

    private $lastLine = '';

    private $defaultPermissions = 0777;

    public function __construct( $logDirectory, $logLevelThreshold = LogLevel_DEBUG, array $options = array() )
    {
        $this->logLevelThreshold = $logLevelThreshold;
        $this->options = array_merge( $this->options, $options );

        $logDirectory = rtrim( $logDirectory, '/' );
        if ( !file_exists( $logDirectory ) )
		{
            mkdir( $logDirectory, $this->defaultPermissions, true );
        }

        if ( strpos( $logDirectory, 'php://' ) === 0 )
		{
            $this->setLogToStdOut( $logDirectory );
            $this->setFileHandle( 'w+' );
        }
		else
		{
            $this->setLogFilePath( $logDirectory );
            if ( file_exists( $this->logFilePath ) && !is_writable( $this->logFilePath ) )
			{
                throw new RuntimeException( 'The file could not be written to. Check that appropriate permissions have been set.' );
            }
            $this->setFileHandle( 'a' );
        }

        if ( !$this->fileHandle)
		{
            throw new RuntimeException( 'The file could not be opened. Check permissions.' );
        }
    }

    public function setLogToStdOut( $stdOutPath )
	{
        $this->logFilePath = $stdOutPath;
    }

    public function setLogFilePath( $logDirectory )
	{
        if ( $this->options['filename'] )
		{
            if ( strpos( $this->options['filename'], '.log' ) !== false || strpos( $this->options['filename'], '.txt' ) !== false )
			{
                $this->logFilePath = $logDirectory.'/'.$this->options['filename'];
            }
            else
			{
                $this->logFilePath = $logDirectory.'/'.$this->options['filename'].'.'.$this->options['extension'];
            }
        }
		else
		{
            $this->logFilePath = $logDirectory.'/'.$this->options['prefix'].date('Y-m-d').'.'.$this->options['extension'];
        }
    }

    /**
     * @param $writeMode
     *
     * @internal param resource $fileHandle
     */
    public function setFileHandle( $writeMode )
	{
        $this->fileHandle = fopen($this->logFilePath, $writeMode);
    }


    /**
     * Class destructor
     */
    public function __destruct()
    {
        if ( $this->fileHandle )
		{
            fclose( $this->fileHandle );
        }
    }

    /**
     * Sets the date format used by all instances of KLogger
     *
     * @param string $dateFormat Valid format string for date()
     */
    public function setDateFormat( $dateFormat )
    {
        $this->options['dateFormat'] = $dateFormat;
    }

    /**
     * Sets the Log Level Threshold
     *
     * @param string $logLevelThreshold The log level threshold
     */
    public function setLogLevelThreshold( $logLevelThreshold )
    {
        $this->logLevelThreshold = $logLevelThreshold;
    }

    /**
     * Logs with an arbitrary level.
     *
     * @param mixed $level
     * @param string $message
     * @param array $context
     * @return null
     */
    public function log( $level, $message, array $context = array() )
    {
        if ( $this->logLevels[$this->logLevelThreshold] < $this->logLevels[$level] )
		{
            return;
        }
        $message = $this->formatMessage( $level, $message, $context );
        $this->write( $message );
    }

    public function write( $message )
    {
        if ( null !== $this->fileHandle )
		{
            if ( fwrite( $this->fileHandle, $message ) === false )
			{
                throw new RuntimeException('The file could not be written to. Check that appropriate permissions have been set.');
            }
			else
			{
                $this->lastLine = trim( $message );
                $this->logLineCount++;

                if ( $this->options['flushFrequency'] && $this->logLineCount % $this->options['flushFrequency'] === 0 )
				{
                    fflush( $this->fileHandle );
                }
            }
        }
    }

    public function getLogFilePath()
    {
        return $this->logFilePath;
    }

    public function getLastLogLine()
    {
        return $this->lastLine;
    }

	public function log_trace()
	{
		$trace  = debug_backtrace();
		$caller = array_shift($trace);
		$function_name = $caller['function'];
		return sprintf('%s:%s:%s', $function_name, $caller['file'], $caller['line'] );
		/*
		foreach ($trace as $entry_id => $entry)
		{
			$entry['file'] = $entry['file'] ? : '-';
			$entry['line'] = $entry['line'] ? : '-';
			if (empty($entry['class']))
			{
				error_log(sprintf('%s %3s. %s() %s:%s', $function_name, $entry_id + 1, $entry['function'], $entry['file'], $entry['line'])); 
			}
			else
			{
				error_log(sprintf('%s %3s. %s->%s() %s:%s', $function_name, $entry_id + 1, $entry['class'], $entry['function'], $entry['file'], $entry['line']));
			}
		}
		*/
	} 

    protected function formatMessage( $level, $message, $context )
    {
        if ( $this->options['logFormat'] )
		{
            $parts = array(
                'date'          => date( $this->options['dateFormat'] );,
				'trace'         => $this->log_trace(),
                'level'         => strtoupper( $level ),
                'level-padding' => str_repeat( ' ', 9 - strlen( $level ) ),
                'priority'      => $this->logLevels[$level],
                'message'       => $message,
                'context'       => json_encode( $context ),
            );
            $message = $this->options['logFormat'];
            foreach ( $parts as $part => $value )
			{
                $message = str_replace( '{'.$part.'}', $value, $message );
            }

        }
		else
		{
            $message = "[{$this->getTimestamp()}] [{$level}] {$message}";
        }

        if ( $this->options['appendContext'] && !empty( $context ) )
		{
            $message .= PHP_EOL.$this->indent( $this->contextToString( $context ) );
        }

        return $message.PHP_EOL;

    }

    protected function contextToString( $context )
    {
		$export = '';
        foreach ( $context as $key => $value )
		{
			$export .= "{$key}: ";
			$export .= preg_replace(array(
                '/=>\s+([a-zA-Z])/im',
                '/array\(\s+\)/im',
                '/^  |\G  /m'
            ), array(
                '=> $1',
                'array()',
                '    '
            ), str_replace('array (', 'array(', var_export($value, true)));
            $export .= PHP_EOL;
        }
        return str_replace(array('\\\\', '\\\''), array('\\', '\''), rtrim($export));
    }

    protected function indent($string, $indent = '    ')
    {
        return $indent.str_replace("\n", "\n".$indent, $string);
    }
}
?>