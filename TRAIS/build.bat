ant
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar TRAIS_en.2.0-concatenate.js -o TRAIS_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar TRAIS_fr.2.0-concatenate.js -o TRAIS_fr.2.0-min.js
cp TRAIS_en.2.0-min.js /Y/web/TRAIS
cp TRAIS_fr.2.0-min.js /Y/web/TRAIS
rm TRAIS_en.2.0-concatenate.js
rm TRAIS_fr.2.0-concatenate.js
rm TRAIS_en.2.0-min.js
rm TRAIS_fr.2.0-min.js
