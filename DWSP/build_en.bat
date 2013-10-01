ant -f build_en.xml
rm DWSP_en.2.0-concatenate.js
rm DWSP_en.2.0-concatenate-min.js
cp DWSP_en.2.0-min.js /Y/web/DWSP/en
rm DWSP_en.2.0-min.js
cp DWSP_en.htm /Y/web/DWSP/en
mv /Y/web/DWSP/en/DWSP_en.htm  /Y/web/DWSP/en/DWSP.htm
