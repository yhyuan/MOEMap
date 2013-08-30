ant -f build_Report_fr.xml
rm TRAIS_Report_fr.2.0-concatenate.js
rm TRAIS_Report_fr.2.0-concatenate-min.js
cp TRAIS_Report_fr.2.0-min.js /Y/web/TRAIS/fr
rm TRAIS_Report_fr.2.0-min.js
cp TRAIS_Report_fr.htm /Y/web/TRAIS/fr
mv /Y/web/TRAIS/fr/TRAIS_Report_fr.htm  /Y/web/TRAIS/fr/TRAIS_Report.htm
