ant -f build_en.xml
rm DrinkingWater_en.2.0-concatenate.js
rm DrinkingWater_en.2.0-concatenate-min.js
cp DrinkingWater_en.2.0-min.js /Y/web/DrinkingWater/en
rm DrinkingWater_en.2.0-min.js
cp DrinkingWater_en.htm /Y/web/DrinkingWater/en
mv /Y/web/DrinkingWater/en/DrinkingWater_en.htm  /Y/web/DrinkingWater/en/DrinkingWater.htm
