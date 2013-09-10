ant -f build_en.xml
rm Wells_en.2.0-concatenate.js
rm Wells_en.2.0-concatenate-min.js
cp Wells_en.2.0-min.js /Y/web/Wells/en
cp Wells_en.2.0-min.js /Z/Public/Wells/en
rm Wells_en.2.0-min.js
cp Wells_en.htm /Y/web/Wells/en
cp Wells_en.htm /Z/Public/Wells/en
mv /Y/web/Wells/en/Wells_en.htm  /Y/web/Wells/en/Wells.htm
mv /Z/Public/Wells/en/Wells_en.htm  /Z/Public/Wells/en/Wells.htm
