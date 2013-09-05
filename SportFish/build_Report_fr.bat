ant -f build_Report_fr.xml
rm SportFish_Report_fr.2.0-concatenate.js
rm SportFish_Report_fr.2.0-concatenate-min.js
cp SportFish_Report_fr.2.0-min.js /Y/web/SportFish/fr
rm SportFish_Report_fr.2.0-min.js
cp SportFish_Report_fr.htm /Y/web/SportFish/fr
mv /Y/web/SportFish/fr/SportFish_Report_fr.htm  /Y/web/SportFish/fr/SportFish_Report.htm
