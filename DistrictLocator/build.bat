ant
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar DistrictLocator_en.2.0-concatenate.js -o DistrictLocator_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar DistrictLocator_fr.2.0-concatenate.js -o DistrictLocator_fr.2.0-min.js
cp DistrictLocator_en.2.0-min.js /Y/web/DistrictLocator
cp DistrictLocator_fr.2.0-min.js /Y/web/DistrictLocator
rm DistrictLocator_en.2.0-concatenate.js
rm DistrictLocator_fr.2.0-concatenate.js
rm DistrictLocator_en.2.0-min.js
rm DistrictLocator_fr.2.0-min.js
