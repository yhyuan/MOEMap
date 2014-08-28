ant -f build_fr.xml
rm LandFill_fr.2.0-concatenate.js
rm LandFill_fr.2.0-concatenate-min.js
cp LandFill_fr.2.0-min.js /Y/web/LandFill/fr
rm LandFill_fr.2.0-min.js
cp LandFill_fr.htm /Y/web/LandFill/fr
mv /Y/web/LandFill/fr/LandFill_fr.htm  /Y/web/LandFill/fr/LandFill.htm
