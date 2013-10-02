ant -f build_en.xml
rm DistrictLocator_en.2.0-concatenate.js
rm DistrictLocator_en.2.0-concatenate-min.js
cp DistrictLocator_en.2.0-min.js /Y/web/DistrictLocator/en
rm DistrictLocator_en.2.0-min.js
cp DistrictLocator_en.htm /Y/web/DistrictLocator/en
mv /Y/web/DistrictLocator/en/DistrictLocator_en.htm  /Y/web/DistrictLocator/en/DistrictLocator.htm
