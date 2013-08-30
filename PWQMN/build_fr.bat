ant -f build_fr.xml
rm PWQMN_fr.2.0-concatenate.js
rm PWQMN_fr.2.0-concatenate-min.js
cp PWQMN_fr.2.0-min.js /Y/web/PWQMN/fr
rm PWQMN_fr.2.0-min.js
cp PWQMN_fr.htm /Y/web/PWQMN/fr
mv /Y/web/PWQMN/fr/PWQMN_fr.htm  /Y/web/PWQMN/fr/PWQMN.htm
