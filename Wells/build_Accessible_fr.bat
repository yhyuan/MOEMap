ant -f build_Accessible_fr.xml
rm Wells_Accessible_fr.2.0-concatenate.js
rm Wells_Accessible_fr.2.0-concatenate-min.js
cp Wells_Accessible_fr.2.0-min.js /Y/web/Wells/fr
rm Wells_Accessible_fr.2.0-min.js
cp Wells_Accessible_fr.htm /Y/web/Wells/fr
mv /Y/web/Wells/fr/Wells_Accessible_fr.htm  /Y/web/Wells/fr/Wells_Accessible.htm
