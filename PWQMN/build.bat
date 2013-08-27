ant
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PWQMN_en.2.0-concatenate.js -o PWQMN_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PWQMN_fr.2.0-concatenate.js -o PWQMN_fr.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PWQMN_Accessible_en.2.0-concatenate.js -o PWQMN_Accessible_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar PWQMN_Accessible_fr.2.0-concatenate.js -o PWQMN_Accessible_fr.2.0-min.js
cp PWQMN_en.2.0-min.js /Y/web/PWQMN
cp PWQMN_fr.2.0-min.js /Y/web/PWQMN
cp PWQMN_Accessible_en.2.0-min.js /Y/web/PWQMN
cp PWQMN_Accessible_fr.2.0-min.js /Y/web/PWQMN
rm PWQMN_en.2.0-concatenate.js
rm PWQMN_fr.2.0-concatenate.js
rm PWQMN_en.2.0-min.js
rm PWQMN_fr.2.0-min.js
rm PWQMN_Accessible_en.2.0-concatenate.js
rm PWQMN_Accessible_fr.2.0-concatenate.js
rm PWQMN_Accessible_en.2.0-min.js
rm PWQMN_Accessible_fr.2.0-min.js
