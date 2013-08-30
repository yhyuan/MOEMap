ant -f build_Report_en.xml
rm TRAIS_Report_en.2.0-concatenate.js
rm TRAIS_Report_en.2.0-concatenate-min.js
cp TRAIS_Report_en.2.0-min.js /Y/web/TRAIS/en
rm TRAIS_Report_en.2.0-min.js
cp TRAIS_Report_en.htm /Y/web/TRAIS/en
mv /Y/web/TRAIS/en/TRAIS_Report_en.htm  /Y/web/TRAIS/en/TRAIS_Report.htm
