ant -f build_en.xml
rm GreatLakesWatershedLocator_en.2.0-concatenate.js
rm GreatLakesWatershedLocator_en.2.0-concatenate-min.js
cp GreatLakesWatershedLocator_en.2.0-min.js /Y/web/GreatLakesWatershedLocator/en
rm GreatLakesWatershedLocator_en.2.0-min.js
cp GreatLakesWatershedLocator_en.htm /Y/web/GreatLakesWatershedLocator/en
mv /Y/web/GreatLakesWatershedLocator/en/GreatLakesWatershedLocator_en.htm  /Y/web/GreatLakesWatershedLocator/en/GreatLakesWatershedLocator.htm
