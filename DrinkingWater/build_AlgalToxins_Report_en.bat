ant -f build_AlgalToxins_Report_en.xml
rm AlgalToxins_Report_en.2.0-concatenate.js
rm AlgalToxins_Report_en.2.0-concatenate-min.js
cp AlgalToxins_Report_en.2.0-min.js /Y/web/DrinkingWater/en
rm AlgalToxins_Report_en.2.0-min.js
cp AlgalToxins_Report_en.htm /Y/web/DrinkingWater/en
mv /Y/web/DrinkingWater/en/AlgalToxins_Report_en.htm  /Y/web/DrinkingWater/en/AlgalToxins_Report.htm
