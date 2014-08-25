ant -f build_AlgalToxins_Report_fr.xml
rm AlgalToxins_Report_fr.2.0-concatenate.js
rm AlgalToxins_Report_fr.2.0-concatenate-min.js
cp AlgalToxins_Report_fr.2.0-min.js /Y/web/DrinkingWater/fr
rm AlgalToxins_Report_fr.2.0-min.js
cp AlgalToxins_Report_fr.htm /Y/web/DrinkingWater/fr
mv /Y/web/DrinkingWater/fr/AlgalToxins_Report_fr.htm  /Y/web/DrinkingWater/fr/AlgalToxins_Report.htm
