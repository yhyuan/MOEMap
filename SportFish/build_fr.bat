ant -f build_fr.xml
rm SportFish_fr.2.0-concatenate.js
rm SportFish_fr.2.0-concatenate-min.js
cp SportFish_fr.2.0-min.js /Y/web/SportFish/fr
rm SportFish_fr.2.0-min.js
cp SportFish_fr.htm /Y/web/SportFish/fr
mv /Y/web/SportFish/fr/SportFish_fr.htm  /Y/web/SportFish/fr/SportFish.htm
