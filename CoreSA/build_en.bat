ant -f build_en.xml
rm CoreSA_en.2.0-concatenate.js
rm CoreSA_en.2.0-concatenate-min.js
cp CoreSA_en.2.0-min.js /Y/web/CoreSA/en
rm CoreSA_en.2.0-min.js
cp CoreSA_en.htm /Y/web/CoreSA/en
mv /Y/web/CoreSA/en/CoreSA_en.htm  /Y/web/CoreSA/en/CoreSA.htm
