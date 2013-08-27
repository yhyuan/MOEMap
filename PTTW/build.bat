ant
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PTTW_en.2.0-concatenate.js -o PTTW_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PTTW_fr.2.0-concatenate.js -o PTTW_fr.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PTTW_Accessible_en.2.0-concatenate.js -o PTTW_Accessible_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PTTW_Accessible_fr.2.0-concatenate.js -o PTTW_Accessible_fr.2.0-min.js
cp PTTW_en.2.0-min.js /Y/web/PTTW
cp PTTW_fr.2.0-min.js /Y/web/PTTW
cp PTTW_Accessible_en.2.0-min.js /Y/web/PTTW
cp PTTW_Accessible_fr.2.0-min.js /Y/web/PTTW
rm PTTW_en.2.0-concatenate.js
rm PTTW_fr.2.0-concatenate.js
rm PTTW_en.2.0-min.js
rm PTTW_fr.2.0-min.js
rm PTTW_Accessible_en.2.0-concatenate.js
rm PTTW_Accessible_fr.2.0-concatenate.js
rm PTTW_Accessible_en.2.0-min.js
rm PTTW_Accessible_fr.2.0-min.js
