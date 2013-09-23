ant -f build_Accessible_en.xml
rm PTTW_Accessible_en.2.0-concatenate.js
rm PTTW_Accessible_en.2.0-concatenate-min.js
cp PTTW_Accessible_en.2.0-min.js /Y/web/PTTW/en
rm PTTW_Accessible_en.2.0-min.js
cp PTTW_Accessible_en.htm /Y/web/PTTW/en
mv /Y/web/PTTW/en/PTTW_Accessible_en.htm  /Y/web/PTTW/en/PTTW_Accessible.htm
