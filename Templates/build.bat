ant
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar [APPLICATION]_en.2.0-concatenate.js -o [APPLICATION]_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar [APPLICATION]_fr.2.0-concatenate.js -o [APPLICATION]_fr.2.0-min.js
cp [APPLICATION]_en.2.0-min.js /Y/web/[APPLICATION]
cp [APPLICATION]_fr.2.0-min.js /Y/web/[APPLICATION]
rm [APPLICATION]_en.2.0-concatenate.js
rm [APPLICATION]_fr.2.0-concatenate.js
rm [APPLICATION]_en.2.0-min.js
rm [APPLICATION]_fr.2.0-min.js
