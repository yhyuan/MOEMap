ant -f build_Accessible_en.xml
rm PWQMN_Accessible_en.2.0-concatenate.js
rm PWQMN_Accessible_en.2.0-concatenate-min.js
cp PWQMN_Accessible_en.2.0-min.js /Y/web/PWQMN/en
rm PWQMN_Accessible_en.2.0-min.js
cp PWQMN_Accessible_en.htm /Y/web/PWQMN/en
mv /Y/web/PWQMN/en/PWQMN_Accessible_en.htm  /Y/web/PWQMN/en/PWQMN_Accessible.htm
