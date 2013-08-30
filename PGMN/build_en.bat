ant -f build_en.xml
rm PGMN_en.2.0-concatenate.js
rm PGMN_en.2.0-concatenate-min.js
cp PGMN_en.2.0-min.js /Y/web/PGMN/en
rm PGMN_en.2.0-min.js
cp PGMN_en.htm /Y/web/PGMN/en
mv /Y/web/PGMN/en/PGMN_en.htm  /Y/web/PGMN/en/PGMN.htm
