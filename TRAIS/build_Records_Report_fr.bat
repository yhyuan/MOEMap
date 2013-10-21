ant -f build_Records_Report_fr.xml
rm TRAIS_Records_Report_fr.2.0-concatenate.js
rm TRAIS_Records_Report_fr.2.0-concatenate-min.js
cp TRAIS_Records_Report_fr.2.0-min.js /Y/web/TRAIS/fr
rm TRAIS_Records_Report_fr.2.0-min.js
cp TRAIS_Records_Report_fr.htm /Y/web/TRAIS/fr
mv /Y/web/TRAIS/fr/TRAIS_Records_Report_fr.htm  /Y/web/TRAIS/fr/TRAIS_Records_Report.htm
