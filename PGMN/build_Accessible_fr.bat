ant -f build_Accessible_fr.xml
rm PGMN_Accessible_fr.2.0-concatenate.js
rm PGMN_Accessible_fr.2.0-concatenate-min.js
cp PGMN_Accessible_fr.2.0-min.js /Y/web/PGMN/fr
rm PGMN_Accessible_fr.2.0-min.js
cp PGMN_Accessible_fr.htm /Y/web/PGMN/fr
mv /Y/web/PGMN/fr/PGMN_Accessible_fr.htm  /Y/web/PGMN/fr/PGMN_Accessible.htm
