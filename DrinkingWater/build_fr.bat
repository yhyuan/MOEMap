ant -f build_fr.xml
rm DrinkingWater_fr.2.0-concatenate.js
rm DrinkingWater_fr.2.0-concatenate-min.js
cp DrinkingWater_fr.2.0-min.js /Y/web/DrinkingWater/fr
rm DrinkingWater_fr.2.0-min.js
cp DrinkingWater_fr.htm /Y/web/DrinkingWater/fr
mv /Y/web/DrinkingWater/fr/DrinkingWater_fr.htm  /Y/web/DrinkingWater/fr/DrinkingWater.htm
