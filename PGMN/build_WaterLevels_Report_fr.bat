ant -f build_WaterLevels_Report_fr.xml
rm WaterLevels_Report_fr.2.0-concatenate.js
rm WaterLevels_Report_fr.2.0-concatenate-min.js
cp WaterLevels_Report_fr.2.0-min.js /Y/web/PGMN/fr
rm WaterLevels_Report_fr.2.0-min.js
cp WaterLevels_Report_fr.htm /Y/web/PGMN/fr
mv /Y/web/PGMN/fr/WaterLevels_Report_fr.htm  /Y/web/PGMN/fr/WaterLevels_Report.htm
