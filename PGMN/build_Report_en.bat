ant -f build_Report_en.xml
rm PGMN_Report_en.2.0-concatenate.js
rm PGMN_Report_en.2.0-concatenate-min.js
cp PGMN_Report_en.2.0-min.js /Y/web/PGMN/en
rm PGMN_Report_en.2.0-min.js
cp PGMN_Report_en.htm /Y/web/PGMN/en
mv /Y/web/PGMN/en/PGMN_Report_en.htm  /Y/web/PGMN/en/PGMN_Report.htm
