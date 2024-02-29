@echo off
rem USAGE: easy.bat [|test|real]
rem 				default argment is 'test'
set ARG1=%1
set ARG2=%2
set WORK_DIR=D:\workspace\kc_checktool

if [%1]==[] set ARG1=test
if [%2]==[] set ARG2=master

set ZIP_FILE_NAME=server_checktool_%ARG1%_%ARG2%_jwahn

rem >> client 의 config 파일을 배포 환경에 적합한 것으로 바꾼다.
pushd %WORK_DIR%\client\src\js
@echo on
copy /y config.%ARG1%.js config.js
@echo off
popd 

rem >> 과거에 쓴 배포용 파일과 경로가 있다면 지우고, 신규로 경로를 생성한다.
rem >> 배포용 파일은 지우지 말고 백업하자
SET DATETEXT=%date:~0,4%%date:~5,2%%date:~8,2%
SET TIMETEXT=%time:~0,2%%time:~3,2%%time:~6,2%
move %ZIP_FILE_NAME%.zip %ZIP_FILE_NAME%_%DATETEXT%_%TIMETEXT%.zip

rem echo y | del %ZIP_FILE_NAME%.zip
echo y | rmdir /S %ZIP_FILE_NAME%
mkdir %ZIP_FILE_NAME%

rem >> 임시로 사용할 .bat 파일을 만들어서 npm run build 를 실행한 후, 지운다.
pushd %WORK_DIR%\client 
echo npm run build > npmrunbuild.bat
if [%2]==[] call "npmrunbuild.bat"
del "npmrunbuild.bat"
popd
rem pause

rem >> client 에 포함되어 있는 파일들을 server 의 적합한 경로로 복사한다.
@echo on
rem xcopy /E /y %WORK_DIR%\client\assets %WORK_DIR%\server\public\assets
echo f | xcopy /E /y %WORK_DIR%\client\dist\build.js %WORK_DIR%\server\public\js\build.js
xcopy /E /y %WORK_DIR%\client\assets\img\* %WORK_DIR%\server\public\assets\img\*
xcopy /E /y %WORK_DIR%\client\assets\css\* %WORK_DIR%\server\public\assets\css\*
xcopy /E /y %WORK_DIR%\client\assets\js\* %WORK_DIR%\server\public\assets\js\*
@echo off

rem >> server 경로로 이동하여 배포할 파일들을 복사한다.
pushd %WORK_DIR%\server
copy /y %WORK_DIR%\server\server.js %ZIP_FILE_NAME%\server.js
rem copy /y %WORK_DIR%\server\ecosystem.config_%ARG1%.js %ZIP_FILE_NAME%\ecosystem.config.js
rem xcopy /E /y %WORK_DIR%\server\public\js\build.js %ZIP_FILE_NAME%\public\js\build.js
echo f | xcopy /E /y public\js\build.js %ZIP_FILE_NAME%\public\js\build.js
xcopy /E /y %WORK_DIR%\client\assets\img\* %ZIP_FILE_NAME%\public\assets\img\*
xcopy /E /y %WORK_DIR%\client\assets\css\* %ZIP_FILE_NAME%\public\assets\css\*
xcopy /E /y %WORK_DIR%\client\assets\js\* %ZIP_FILE_NAME%\public\assets\js\*
xcopy /E /y config\* %ZIP_FILE_NAME%\config\*
xcopy /E /y database\* %ZIP_FILE_NAME%\database\*
xcopy /E /y routes\* %ZIP_FILE_NAME%\routes\*
xcopy /E /y util\* %ZIP_FILE_NAME%\util\*
xcopy /E /y batch\* %ZIP_FILE_NAME%\batch\*
xcopy /E /y sql\* %ZIP_FILE_NAME%\sql\*
rem xcopy /E /y tcp\* %ZIP_FILE_NAME%\tcp\*
rem xcopy /E /y node_modules\app-module-path\* %ZIP_FILE_NAME%\node_modules\app-module-path\*
popd

rem >> 배포용 파일을 압축한다.
pushd %WORK_DIR%\server
@echo on
rem "C:\Program Files\7-Zip\7z.exe" a -tzip "%ZIP_FILE_NAME%.zip" "server.js" ".\public\js\build.js" ".\public\assets\css" ".\config" ".\database" ".\routes" ".\util"
"C:\Program Files\7-Zip\7z.exe" a -tzip "%ZIP_FILE_NAME%.zip" ".\%ZIP_FILE_NAME%\*"
echo y | rmdir /S %ZIP_FILE_NAME%
@echo off
popd

rem >> client 의 config 파일을 개발 환경에 맞게 되돌린다.
pushd %WORK_DIR%\client\src\js
@echo on
copy /y config.dev.js config.js
copy /y menu.dev.js menu.js
@echo off
popd 



