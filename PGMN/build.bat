ant
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PGMN_en.2.0-concatenate.js -o PGMN_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PGMN_fr.2.0-concatenate.js -o PGMN_fr.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PGMN_Accessible_en.2.0-concatenate.js -o PGMN_Accessible_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PGMN_Accessible_fr.2.0-concatenate.js -o PGMN_Accessible_fr.2.0-min.js
cp PGMN_en.2.0-min.js /Y/web/PGMN
cp PGMN_fr.2.0-min.js /Y/web/PGMN
cp PGMN_Accessible_en.2.0-min.js /Y/web/PGMN
cp PGMN_Accessible_fr.2.0-min.js /Y/web/PGMN
rm PGMN_en.2.0-concatenate.js
rm PGMN_fr.2.0-concatenate.js
rm PGMN_en.2.0-min.js
rm PGMN_fr.2.0-min.js
rm PGMN_Accessible_en.2.0-concatenate.js
rm PGMN_Accessible_fr.2.0-concatenate.js
rm PGMN_Accessible_en.2.0-min.js
rm PGMN_Accessible_fr.2.0-min.js
