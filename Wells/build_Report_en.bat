ant -f build_Report_en.xml
rm Wells_Report_en.2.0-concatenate.js
rm Wells_Report_en.2.0-concatenate-min.js
cp Wells_Report_en.2.0-min.js /Y/web/Wells/en
rm Wells_Report_en.2.0-min.js
cp Wells_Report_en.htm /Y/web/Wells/en
mv /Y/web/Wells/en/Wells_Report_en.htm  /Y/web/Wells/en/Wells_Report.htm
