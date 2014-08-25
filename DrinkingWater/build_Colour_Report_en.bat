ant -f build_Colour_Report_en.xml
rm Colour_Report_en.2.0-concatenate.js
rm Colour_Report_en.2.0-concatenate-min.js
cp Colour_Report_en.2.0-min.js /Y/web/DrinkingWater/en
rm Colour_Report_en.2.0-min.js
cp Colour_Report_en.htm /Y/web/DrinkingWater/en
mv /Y/web/DrinkingWater/en/Colour_Report_en.htm  /Y/web/DrinkingWater/en/Colour_Report.htm
