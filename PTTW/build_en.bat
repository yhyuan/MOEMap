ant -f build_en.xml
rm PTTW_en.2.0-concatenate.js
rm PTTW_en.2.0-concatenate-min.js
cp PTTW_en.2.0-min.js /Y/web/PTTW/en
rm PTTW_en.2.0-min.js
cp PTTW_en.htm /Y/web/PTTW/en
mv /Y/web/PTTW/en/PTTW_en.htm  /Y/web/PTTW/en/PTTW.htm
