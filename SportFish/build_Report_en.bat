ant -f build_Report_en.xml
rm SportFish_Report_en.2.0-concatenate.js
rm SportFish_Report_en.2.0-concatenate-min.js
cp SportFish_Report_en.2.0-min.js /Y/web/SportFish/en
rm SportFish_Report_en.2.0-min.js
cp SportFish_Report_en.htm /Y/web/SportFish/en
mv /Y/web/SportFish/en/SportFish_Report_en.htm  /Y/web/SportFish/en/SportFish_Report.htm
