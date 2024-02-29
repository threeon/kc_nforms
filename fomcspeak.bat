@echo off
:1
echo %date% %time%
curl -s -o speakList.txt -k "https://www.stlouisfed.org/rss/page-resources/fomcspeak/remarks"
curl -s --data-urlencode @speakList.txt -H 'Content-Type: application/x-www-form-urlencoded' -X POST https://checktool.koscom.co.kr/fomcspeak/fomcSpeakUpdater

del speakList.txt
timeout -t 3600 /nobreak
goto 1