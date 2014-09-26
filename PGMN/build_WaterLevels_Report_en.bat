ant -f build_WaterLevels_Report_en.xml
rm WaterLevels_Report_en.2.0-concatenate.js
rm WaterLevels_Report_en.2.0-concatenate-min.js
cp WaterLevels_Report_en.2.0-min.js /Y/web/PGMN/en
rm WaterLevels_Report_en.2.0-min.js
cp WaterLevels_Report_en.htm /Y/web/PGMN/en
mv /Y/web/PGMN/en/WaterLevels_Report_en.htm  /Y/web/PGMN/en/WaterLevels_Report.htm
