ant -f build_Adv_en.xml
rm AccessEnvironmentAdv_en.2.0-concatenate.js
rm AccessEnvironmentAdv_en.2.0-concatenate-min.js
cp AccessEnvironmentAdv_en.2.0-min.js /Y/web/AccessEnvironment/en
rm AccessEnvironmentAdv_en.2.0-min.js
cp AccessEnvironmentAdv_en.htm /Y/web/AccessEnvironment/en
mv /Y/web/AccessEnvironment/en/AccessEnvironmentAdv_en.htm  /Y/web/AccessEnvironment/en/AccessEnvironmentAdv.htm
