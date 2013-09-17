ant -f build_Accessible_fr.xml
rm AccessEnvironment_Accessible_fr.2.0-concatenate.js
rm AccessEnvironment_Accessible_fr.2.0-concatenate-min.js
cp AccessEnvironment_Accessible_fr.2.0-min.js /Y/web/AccessEnvironment/fr
rm AccessEnvironment_Accessible_fr.2.0-min.js
cp AccessEnvironment_Accessible_fr.htm /Y/web/AccessEnvironment/fr
mv /Y/web/AccessEnvironment/fr/AccessEnvironment_Accessible_fr.htm  /Y/web/AccessEnvironment/fr/AccessEnvironment_Accessible.htm
