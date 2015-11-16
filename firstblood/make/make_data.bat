



@echo off
call config.bat

rem if exist %DATA_PATH% (
rem 	rd /s /q %DATA_PATH%
rem )

if not exist %DATA_PATH% (
    mkdir %DATA_PATH%
)

echo Export xls data, please wait a few second...

cd ../tools/excel2json

rem -  -e, --excel       Required. 输入的Excel文件路径.
rem -  -j, --json        指定输出的json文件路径.
rem -  -s, --sql         指定输出的SQL文件路径.
rem -  -p, --csharp      指定输出的C#数据定义代码文件路径.
rem -  -h, --header      Required. 表格中有几行是表头.
rem -  -c, --encoding    (Default: utf8-nobom) 指定编码的名称.
rem -  -l, --lowcase     (Default: false) 自动把字段名称转换成小写格式.

echo %DOC_PATH%\config\hero.xlsx
.\bin\excel2json --excel %DOC_PATH%\config\hero.xlsx --json %DATA_PATH%\hero.json --header 3
.\bin\excel2json --excel %DOC_PATH%\config\item.xlsx --json %DATA_PATH%\item.json --header 3
.\bin\excel2json --excel %DOC_PATH%\config\error.xlsx --json %DATA_PATH%\error.json --header 3
.\bin\excel2json --excel %DOC_PATH%\config\text_zh.xlsx --json %DATA_PATH%\text_zh.json --header 3


pause
cd ../%MAKE_PATH_NAME%/



