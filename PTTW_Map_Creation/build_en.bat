ant -f build_en.xml
rm PTTW_Map_Creation_en.2.0-concatenate.js
rm PTTW_Map_Creation_en.2.0-concatenate-min.js
cp PTTW_Map_Creation_en.2.0-min.js /Y/web/PTTW_Map_Creation/en
rm PTTW_Map_Creation_en.2.0-min.js
cp PTTW_Map_Creation_en.htm /Y/web/PTTW_Map_Creation/en
mv /Y/web/PTTW_Map_Creation/en/PTTW_Map_Creation_en.htm  /Y/web/PTTW_Map_Creation/en/PTTW_Map_Creation.htm
