ant -f build_en.xml
rm AccessEnvironment_en.2.0-concatenate.js
rm AccessEnvironment_en.2.0-concatenate-min.js
cp AccessEnvironment_en.2.0-min.js /Y/web/AccessEnvironment/en
rm AccessEnvironment_en.2.0-min.js
cp AccessEnvironment_en.htm /Y/web/AccessEnvironment/en
mv /Y/web/AccessEnvironment/en/AccessEnvironment_en.htm  /Y/web/AccessEnvironment/en/AccessEnvironment.htm
