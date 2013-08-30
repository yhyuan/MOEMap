ant -f build_SecchiDepth_Report_en.xml
rm SecchiDepth_Report_en.2.0-concatenate.js
rm SecchiDepth_Report_en.2.0-concatenate-min.js
cp SecchiDepth_Report_en.2.0-min.js /Y/web/LakePartner/en
rm SecchiDepth_Report_en.2.0-min.js
cp SecchiDepth_Report_en.htm /Y/web/LakePartner/en
mv /Y/web/LakePartner/en/SecchiDepth_Report_en.htm  /Y/web/LakePartner/en/SecchiDepth_Report.htm
