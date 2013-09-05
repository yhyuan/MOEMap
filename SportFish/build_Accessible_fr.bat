ant -f build_Accessible_fr.xml
rm SportFish_Accessible_fr.2.0-concatenate.js
rm SportFish_Accessible_fr.2.0-concatenate-min.js
cp SportFish_Accessible_fr.2.0-min.js /Y/web/SportFish/fr
rm SportFish_Accessible_fr.2.0-min.js
cp SportFish_Accessible_fr.htm /Y/web/SportFish/fr
mv /Y/web/SportFish/fr/SportFish_Accessible_fr.htm  /Y/web/SportFish/fr/SportFish_Accessible.htm
