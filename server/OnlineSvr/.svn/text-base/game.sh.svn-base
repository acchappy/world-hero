#!/bin/sh
ulimit -c unlimited
ulimit -n 102400

PHP_PATH="/usr/local/php/bin/php"
EXE_NAME="OnlineSvr"
PORT=8888

if [ "$1" = "stop" ] ; then
	pid=`ps -ef | grep "$EXE_NAME" | grep "$PORT"  | awk '{print $2}'`
	echo "kill -9 "$pid
	kill -9 $pid
elif [ "$1" = "start" ]; then
	$PHP_PATH $EXE_NAME'.php' $PORT
	sleep 1
	tail -n 20 ./log/system.log
elif [ "$1" = "show" ]; then
	ps -aux | grep "$EXE_NAME" | grep "$PORT"
	netstat -nlp | grep "$PORT"
elif [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
	echo "game.sh start|stop"
else
	echo "game.sh start|stop"
fi
