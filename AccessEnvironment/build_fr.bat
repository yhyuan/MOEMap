ant -f build_fr.xml
rm AccessEnvironment_fr.2.0-concatenate.js
rm AccessEnvironment_fr.2.0-concatenate-min.js
cp AccessEnvironment_fr.2.0-min.js /Y/web/AccessEnvironment/fr
rm AccessEnvironment_fr.2.0-min.js
cp AccessEnvironment_fr.htm /Y/web/AccessEnvironment/fr
mv /Y/web/AccessEnvironment/fr/AccessEnvironment_fr.htm  /Y/web/AccessEnvironment/fr/AccessEnvironment.htm
