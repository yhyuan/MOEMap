ant
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PTTW_Map_Creation_en.2.0-concatenate.js -o PTTW_Map_Creation_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PTTW_Map_Creation_fr.2.0-concatenate.js -o PTTW_Map_Creation_fr.2.0-min.js
cp PTTW_Map_Creation_en.2.0-min.js /Y/web/PTTW_Map_Creation
cp PTTW_Map_Creation_fr.2.0-min.js /Y/web/PTTW_Map_Creation
rm PTTW_Map_Creation_en.2.0-concatenate.js
rm PTTW_Map_Creation_fr.2.0-concatenate.js
rm PTTW_Map_Creation_en.2.0-min.js
rm PTTW_Map_Creation_fr.2.0-min.js
