ant -f build_en.xml
rm Wells_en.2.0-concatenate.js
rm Wells_en.2.0-concatenate-min.js
cp Wells_en.2.0-min.js /Y/web/Wells/en
rm Wells_en.2.0-min.js
cp Wells_en.htm /Y/web/Wells/en
mv /Y/web/Wells/en/Wells_en.htm  /Y/web/Wells/en/Wells.htm
