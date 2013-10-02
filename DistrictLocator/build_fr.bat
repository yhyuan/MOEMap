ant -f build_fr.xml
rm DistrictLocator_fr.2.0-concatenate.js
rm DistrictLocator_fr.2.0-concatenate-min.js
cp DistrictLocator_fr.2.0-min.js /Y/web/DistrictLocator/fr
rm DistrictLocator_fr.2.0-min.js
cp DistrictLocator_fr.htm /Y/web/DistrictLocator/fr
mv /Y/web/DistrictLocator/fr/DistrictLocator_fr.htm  /Y/web/DistrictLocator/fr/DistrictLocator.htm
