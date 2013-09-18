ant -f build_AdvAccessible_en.xml
rm AccessEnvironmentAdv_Accessible_en.2.0-concatenate.js
rm AccessEnvironmentAdv_Accessible_en.2.0-concatenate-min.js
cp AccessEnvironmentAdv_Accessible_en.2.0-min.js /Y/web/AccessEnvironment/en
rm AccessEnvironmentAdv_Accessible_en.2.0-min.js
cp AccessEnvironmentAdv_Accessible_en.htm /Y/web/AccessEnvironment/en
mv /Y/web/AccessEnvironment/en/AccessEnvironmentAdv_Accessible_en.htm  /Y/web/AccessEnvironment/en/AccessEnvironmentAdv_Accessible.htm
