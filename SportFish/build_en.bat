ant -f build_en.xml
rm SportFish_en.2.0-concatenate.js
rm SportFish_en.2.0-concatenate-min.js
cp SportFish_en.2.0-min.js /Y/web/SportFish/en
rm SportFish_en.2.0-min.js
cp SportFish_en.htm /Y/web/SportFish/en
mv /Y/web/SportFish/en/SportFish_en.htm  /Y/web/SportFish/en/SportFish.htm
