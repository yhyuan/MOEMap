ant -f build_Chloride_Report_fr.xml
rm Chloride_Report_fr.2.0-concatenate.js
rm Chloride_Report_fr.2.0-concatenate-min.js
cp Chloride_Report_fr.2.0-min.js /Y/web/DrinkingWater/fr
rm Chloride_Report_fr.2.0-min.js
cp Chloride_Report_fr.htm /Y/web/DrinkingWater/fr
mv /Y/web/DrinkingWater/fr/Chloride_Report_fr.htm  /Y/web/DrinkingWater/fr/Chloride_Report.htm
