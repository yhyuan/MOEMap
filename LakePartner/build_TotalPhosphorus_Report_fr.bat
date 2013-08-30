ant -f build_TotalPhosphorus_Report_fr.xml
rm TotalPhosphorus_Report_fr.2.0-concatenate.js
rm TotalPhosphorus_Report_fr.2.0-concatenate-min.js
cp TotalPhosphorus_Report_fr.2.0-min.js /Y/web/LakePartner/fr
rm TotalPhosphorus_Report_fr.2.0-min.js
cp TotalPhosphorus_Report_fr.htm /Y/web/LakePartner/fr
mv /Y/web/LakePartner/fr/TotalPhosphorus_Report_fr.htm  /Y/web/LakePartner/fr/TotalPhosphorus_Report.htm
