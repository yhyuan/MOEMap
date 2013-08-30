ant -f build_en.xml
rm LakePartner_en.2.0-concatenate.js
rm LakePartner_en.2.0-concatenate-min.js
cp LakePartner_en.2.0-min.js /Y/web/LakePartner/en
rm LakePartner_en.2.0-min.js
cp LakePartner_en.htm /Y/web/LakePartner/en
mv /Y/web/LakePartner/en/LakePartner_en.htm  /Y/web/LakePartner/en/LakePartner.htm
