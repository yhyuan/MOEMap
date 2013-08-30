ant -f build_TotalPhosphorus_Report_en.xml
rm TotalPhosphorus_Report_en.2.0-concatenate.js
rm TotalPhosphorus_Report_en.2.0-concatenate-min.js
cp TotalPhosphorus_Report_en.2.0-min.js /Y/web/LakePartner/en
rm TotalPhosphorus_Report_en.2.0-min.js
cp TotalPhosphorus_Report_en.htm /Y/web/LakePartner/en
mv /Y/web/LakePartner/en/TotalPhosphorus_Report_en.htm  /Y/web/LakePartner/en/TotalPhosphorus_Report.htm
