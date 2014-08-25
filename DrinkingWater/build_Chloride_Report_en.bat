ant -f build_Chloride_Report_en.xml
rm Chloride_Report_en.2.0-concatenate.js
rm Chloride_Report_en.2.0-concatenate-min.js
cp Chloride_Report_en.2.0-min.js /Y/web/DrinkingWater/en
rm Chloride_Report_en.2.0-min.js
cp Chloride_Report_en.htm /Y/web/DrinkingWater/en
mv /Y/web/DrinkingWater/en/Chloride_Report_en.htm  /Y/web/DrinkingWater/en/Chloride_Report.htm
