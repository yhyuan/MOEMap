ant -f build_TasteOdour_Report_en.xml
rm TasteOdour_Report_en.2.0-concatenate.js
rm TasteOdour_Report_en.2.0-concatenate-min.js
cp TasteOdour_Report_en.2.0-min.js /Y/web/DrinkingWater/en
rm TasteOdour_Report_en.2.0-min.js
cp TasteOdour_Report_en.htm /Y/web/DrinkingWater/en
mv /Y/web/DrinkingWater/en/TasteOdour_Report_en.htm  /Y/web/DrinkingWater/en/TasteOdour_Report.htm
