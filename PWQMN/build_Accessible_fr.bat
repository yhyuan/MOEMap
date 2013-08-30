ant -f build_Accessible_fr.xml
rm PWQMN_Accessible_fr.2.0-concatenate.js
rm PWQMN_Accessible_fr.2.0-concatenate-min.js
cp PWQMN_Accessible_fr.2.0-min.js /Y/web/PWQMN/fr
rm PWQMN_Accessible_fr.2.0-min.js
cp PWQMN_Accessible_fr.htm /Y/web/PWQMN/fr
mv /Y/web/PWQMN/fr/PWQMN_Accessible_fr.htm  /Y/web/PWQMN/fr/PWQMN_Accessible.htm
