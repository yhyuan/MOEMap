ant -f build_Accessible_fr.xml
rm PTTW_Accessible_fr.2.0-concatenate.js
rm PTTW_Accessible_fr.2.0-concatenate-min.js
cp PTTW_Accessible_fr.2.0-min.js /Y/web/PTTW/fr
rm PTTW_Accessible_fr.2.0-min.js
cp PTTW_Accessible_fr.htm /Y/web/PTTW/fr
mv /Y/web/PTTW/fr/PTTW_Accessible_fr.htm  /Y/web/PTTW/fr/PTTW_Accessible.htm
