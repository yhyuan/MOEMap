ant
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar SportFish_en.2.0-concatenate.js -o SportFish_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar SportFish_fr.2.0-concatenate.js -o SportFish_fr.2.0-min.js
cp SportFish_en.2.0-min.js /Y/web/SportFish
cp SportFish_fr.2.0-min.js /Y/web/SportFish
rm SportFish_en.2.0-concatenate.js
rm SportFish_fr.2.0-concatenate.js
rm SportFish_en.2.0-min.js
rm SportFish_fr.2.0-min.js
