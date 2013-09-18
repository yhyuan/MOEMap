ant -f build_Adv_fr.xml
rm AccessEnvironmentAdv_fr.2.0-concatenate.js
rm AccessEnvironmentAdv_fr.2.0-concatenate-min.js
cp AccessEnvironmentAdv_fr.2.0-min.js /Y/web/AccessEnvironment/fr
rm AccessEnvironmentAdv_fr.2.0-min.js
cp AccessEnvironmentAdv_fr.htm /Y/web/AccessEnvironment/fr
mv /Y/web/AccessEnvironment/fr/AccessEnvironmentAdv_fr.htm  /Y/web/AccessEnvironment/fr/AccessEnvironmentAdv.htm
