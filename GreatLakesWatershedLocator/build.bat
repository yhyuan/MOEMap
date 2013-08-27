ant
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar GreatLakesWatershedLocator_en.2.0-concatenate.js -o GreatLakesWatershedLocator_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar GreatLakesWatershedLocator_fr.2.0-concatenate.js -o GreatLakesWatershedLocator_fr.2.0-min.js
cp GreatLakesWatershedLocator_en.2.0-min.js /Y/web/GreatLakesWatershedLocator
cp GreatLakesWatershedLocator_fr.2.0-min.js /Y/web/GreatLakesWatershedLocator
rm GreatLakesWatershedLocator_en.2.0-concatenate.js
rm GreatLakesWatershedLocator_fr.2.0-concatenate.js
rm GreatLakesWatershedLocator_en.2.0-min.js
rm GreatLakesWatershedLocator_fr.2.0-min.js
