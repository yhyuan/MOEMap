ant -f build_Accessible_en.xml
rm PGMN_Accessible_en.2.0-concatenate.js
rm PGMN_Accessible_en.2.0-concatenate-min.js
cp PGMN_Accessible_en.2.0-min.js /Y/web/PGMN/en
rm PGMN_Accessible_en.2.0-min.js
cp PGMN_Accessible_en.htm /Y/web/PGMN/en
mv /Y/web/PGMN/en/PGMN_Accessible_en.htm  /Y/web/PGMN/en/PGMN_Accessible.htm
