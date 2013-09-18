ant -f build_AdvAccessible_fr.xml
rm AccessEnvironmentAdv_Accessible_fr.2.0-concatenate.js
rm AccessEnvironmentAdv_Accessible_fr.2.0-concatenate-min.js
cp AccessEnvironmentAdv_Accessible_fr.2.0-min.js /Y/web/AccessEnvironment/fr
rm AccessEnvironmentAdv_Accessible_fr.2.0-min.js
cp AccessEnvironmentAdv_Accessible_fr.htm /Y/web/AccessEnvironment/fr
mv /Y/web/AccessEnvironment/fr/AccessEnvironmentAdv_Accessible_fr.htm  /Y/web/AccessEnvironment/fr/AccessEnvironmentAdv_Accessible.htm
