ant -f build_fr.xml
rm Wells_fr.2.0-concatenate.js
rm Wells_fr.2.0-concatenate-min.js
cp Wells_fr.2.0-min.js /Y/web/Wells/fr
REM cp Wells_fr.2.0-min.js /Z/Public/Wells/fr
rm Wells_fr.2.0-min.js
cp Wells_fr.htm /Y/web/Wells/fr
REM cp Wells_fr.htm /Z/Public/Wells/fr
mv /Y/web/Wells/fr/Wells_fr.htm  /Y/web/Wells/fr/Wells.htm
REM mv /Z/Public/Wells/fr/Wells_fr.htm  /Z/Public/Wells/fr/Wells.htm
