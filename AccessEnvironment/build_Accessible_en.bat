ant -f build_Accessible_en.xml
rm AccessEnvironment_Accessible_en.2.0-concatenate.js
rm AccessEnvironment_Accessible_en.2.0-concatenate-min.js
cp AccessEnvironment_Accessible_en.2.0-min.js /Y/web/AccessEnvironment/en
rm AccessEnvironment_Accessible_en.2.0-min.js
cp AccessEnvironment_Accessible_en.htm /Y/web/AccessEnvironment/en
mv /Y/web/AccessEnvironment/en/AccessEnvironment_Accessible_en.htm  /Y/web/AccessEnvironment/en/AccessEnvironment_Accessible.htm
