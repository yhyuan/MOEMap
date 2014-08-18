ant -f build_TasteOdour_Report_fr.xml
rm TasteOdour_Report_fr.2.0-concatenate.js
rm TasteOdour_Report_fr.2.0-concatenate-min.js
cp TasteOdour_Report_fr.2.0-min.js /Y/web/DrinkingWater/fr
rm TasteOdour_Report_fr.2.0-min.js
cp TasteOdour_Report_fr.htm /Y/web/DrinkingWater/fr
mv /Y/web/DrinkingWater/fr/TasteOdour_Report_fr.htm  /Y/web/DrinkingWater/fr/TasteOdour_Report.htm
