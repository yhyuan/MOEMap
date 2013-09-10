ant -f build_fr.xml
rm PTTW_Map_Creation_fr.2.0-concatenate.js
rm PTTW_Map_Creation_fr.2.0-concatenate-min.js
cp PTTW_Map_Creation_fr.2.0-min.js /Y/web/PTTW_Map_Creation/fr
rm PTTW_Map_Creation_fr.2.0-min.js
cp PTTW_Map_Creation_fr.htm /Y/web/PTTW_Map_Creation/fr
mv /Y/web/PTTW_Map_Creation/fr/PTTW_Map_Creation_fr.htm  /Y/web/PTTW_Map_Creation/fr/PTTW_Map_Creation.htm
