ant -f build_SecchiDepth_Report_fr.xml
rm SecchiDepth_Report_fr.2.0-concatenate.js
rm SecchiDepth_Report_fr.2.0-concatenate-min.js
cp SecchiDepth_Report_fr.2.0-min.js /Y/web/LakePartner/fr
rm SecchiDepth_Report_fr.2.0-min.js
cp SecchiDepth_Report_fr.htm /Y/web/LakePartner/fr
mv /Y/web/LakePartner/fr/SecchiDepth_Report_fr.htm  /Y/web/LakePartner/fr/SecchiDepth_Report.htm
