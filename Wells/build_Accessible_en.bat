ant -f build_Accessible_en.xml
rm Wells_Accessible_en.2.0-concatenate.js
rm Wells_Accessible_en.2.0-concatenate-min.js
cp Wells_Accessible_en.2.0-min.js /Y/web/Wells/en
rm Wells_Accessible_en.2.0-min.js
cp Wells_Accessible_en.htm /Y/web/Wells/en
mv /Y/web/Wells/en/Wells_Accessible_en.htm  /Y/web/Wells/en/Wells_Accessible.htm
