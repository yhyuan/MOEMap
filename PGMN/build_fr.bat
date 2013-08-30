ant -f build_fr.xml
rm PGMN_fr.2.0-concatenate.js
rm PGMN_fr.2.0-concatenate-min.js
cp PGMN_fr.2.0-min.js /Y/web/PGMN/fr
rm PGMN_fr.2.0-min.js
cp PGMN_fr.htm /Y/web/PGMN/fr
mv /Y/web/PGMN/fr/PGMN_fr.htm  /Y/web/PGMN/fr/PGMN.htm
