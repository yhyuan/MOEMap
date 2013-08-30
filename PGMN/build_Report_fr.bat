ant -f build_Report_fr.xml
rm PGMN_Report_fr.2.0-concatenate.js
rm PGMN_Report_fr.2.0-concatenate-min.js
cp PGMN_Report_fr.2.0-min.js /Y/web/PGMN/fr
rm PGMN_Report_fr.2.0-min.js
cp PGMN_Report_fr.htm /Y/web/PGMN/fr
mv /Y/web/PGMN/fr/PGMN_Report_fr.htm  /Y/web/PGMN/fr/PGMN_Report.htm
