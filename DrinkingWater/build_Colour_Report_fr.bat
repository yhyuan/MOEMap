ant -f build_Colour_Report_fr.xml
rm Colour_Report_fr.2.0-concatenate.js
rm Colour_Report_fr.2.0-concatenate-min.js
cp Colour_Report_fr.2.0-min.js /Y/web/DrinkingWater/fr
rm Colour_Report_fr.2.0-min.js
cp Colour_Report_fr.htm /Y/web/DrinkingWater/fr
mv /Y/web/DrinkingWater/fr/Colour_Report_fr.htm  /Y/web/DrinkingWater/fr/Colour_Report.htm
