ant -f build_en.xml
rm PWQMN_en.2.0-concatenate.js
rm PWQMN_en.2.0-concatenate-min.js
cp PWQMN_en.2.0-min.js /Y/web/PWQMN/en
rm PWQMN_en.2.0-min.js
cp PWQMN_en.htm /Y/web/PWQMN/en
mv /Y/web/PWQMN/en/PWQMN_en.htm  /Y/web/PWQMN/en/PWQMN.htm
