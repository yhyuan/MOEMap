ant -f build_Accessible_en.xml
rm LakePartner_Accessible_en.2.0-concatenate.js
rm LakePartner_Accessible_en.2.0-concatenate-min.js
cp LakePartner_Accessible_en.2.0-min.js /Y/web/LakePartner/en
rm LakePartner_Accessible_en.2.0-min.js
cp LakePartner_Accessible_en.htm /Y/web/LakePartner/en
mv /Y/web/LakePartner/en/LakePartner_Accessible_en.htm  /Y/web/LakePartner/en/LakePartner_Accessible.htm
