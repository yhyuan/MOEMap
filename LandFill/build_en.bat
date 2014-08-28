ant -f build_en.xml
rm LandFill_en.2.0-concatenate.js
rm LandFill_en.2.0-concatenate-min.js
cp LandFill_en.2.0-min.js /Y/web/LandFill/en
rm LandFill_en.2.0-min.js
cp LandFill_en.htm /Y/web/LandFill/en
mv /Y/web/LandFill/en/LandFill_en.htm  /Y/web/LandFill/en/LandFill.htm
