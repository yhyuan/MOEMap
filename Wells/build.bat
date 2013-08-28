ant
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar Wells_en.2.0-concatenate.js -o Wells_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar Wells_fr.2.0-concatenate.js -o Wells_fr.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar Wells_Accessible_en.2.0-concatenate.js -o Wells_Accessible_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar Wells_Accessible_fr.2.0-concatenate.js -o Wells_Accessible_fr.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar Wells_Report_en-concatenate.js -o Wells_Report_en-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar Wells_Report_fr-concatenate.js -o Wells_Report_fr-min.js
cp Wells_en.2.0-min.js /Y/web/Wells
cp Wells_fr.2.0-min.js /Y/web/Wells
cp Wells_Accessible_en.2.0-min.js /Y/web/Wells
cp Wells_Accessible_fr.2.0-min.js /Y/web/Wells
cp Wells_Report_en-min.js /Y/web/Wells
cp Wells_Report_fr-min.js /Y/web/Wells
rm Wells_en.2.0-concatenate.js
rm Wells_fr.2.0-concatenate.js
rm Wells_en.2.0-min.js
rm Wells_fr.2.0-min.js
rm Wells_Accessible_en.2.0-concatenate.js
rm Wells_Accessible_fr.2.0-concatenate.js
rm Wells_Accessible_en.2.0-min.js
rm Wells_Accessible_fr.2.0-min.js
rm Wells_Report_en-concatenate.js
rm Wells_Report_fr-concatenate.js
rm Wells_Report_en-min.js
rm Wells_Report_fr-min.js
cp Wells_Accessible_en.htm /Y/web/Wells
cp Wells_Accessible_fr.htm /Y/web/Wells
cp Wells_en.htm /Y/web/Wells
cp Wells_fr.htm /Y/web/Wells
cp Wells_Report_en.htm /Y/web/Wells
cp Wells_Report_fr.htm /Y/web/Wells
