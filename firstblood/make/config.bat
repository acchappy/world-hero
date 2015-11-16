

@echo off

SET TRUNK=%~dp0..
SET MAKE_PATH_NAME=make
SET MAKE_PATH=%~dp0..\make
SET RES_PATH=%~dp0..\res\
SET DATA_PATH=%~dp0..\res\data\
SET DOC_PATH=%~dp0..\doc
SET TOOLS_PATH=%~dp0..\tools

rem if not exist "%BUILD_PATH%" (
rem 	mkdir %BUILD_PATH%
rem )

if not exist "%DATA_PATH%" (
	mkdir %DATA_PATH%
)
