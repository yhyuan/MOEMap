ant -f build_Accessible_fr.xml
rm TRAIS_Accessible_fr.2.0-concatenate.js
rm TRAIS_Accessible_fr.2.0-concatenate-min.js
cp TRAIS_Accessible_fr.2.0-min.js /Y/web/TRAIS/fr
rm TRAIS_Accessible_fr.2.0-min.js
cp TRAIS_Accessible_fr.htm /Y/web/TRAIS/fr
mv /Y/web/TRAIS/fr/TRAIS_Accessible_fr.htm  /Y/web/TRAIS/fr/TRAIS_Accessible.htm
