ant -f build_fr.xml
rm GreatLakesWatershedLocator_fr.2.0-concatenate.js
rm GreatLakesWatershedLocator_fr.2.0-concatenate-min.js
cp GreatLakesWatershedLocator_fr.2.0-min.js /Y/web/GreatLakesWatershedLocator/fr
rm GreatLakesWatershedLocator_fr.2.0-min.js
cp GreatLakesWatershedLocator_fr.htm /Y/web/GreatLakesWatershedLocator/fr
mv /Y/web/GreatLakesWatershedLocator/fr/GreatLakesWatershedLocator_fr.htm  /Y/web/GreatLakesWatershedLocator/fr/GreatLakesWatershedLocator.htm
