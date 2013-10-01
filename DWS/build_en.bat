ant -f build_en.xml
rm DWS_en.2.0-concatenate.js
rm DWS_en.2.0-concatenate-min.js
cp DWS_en.2.0-min.js /Y/web/DWS/en
rm DWS_en.2.0-min.js
cp DWS_en.htm /Y/web/DWS/en
mv /Y/web/DWS/en/DWS_en.htm  /Y/web/DWS/en/DWS.htm
