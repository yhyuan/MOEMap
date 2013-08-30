ant -f build_Accessible_fr.xml
rm LakePartner_Accessible_fr.2.0-concatenate.js
rm LakePartner_Accessible_fr.2.0-concatenate-min.js
cp LakePartner_Accessible_fr.2.0-min.js /Y/web/LakePartner/fr
rm LakePartner_Accessible_fr.2.0-min.js
cp LakePartner_Accessible_fr.htm /Y/web/LakePartner/fr
mv /Y/web/LakePartner/fr/LakePartner_Accessible_fr.htm  /Y/web/LakePartner/fr/LakePartner_Accessible.htm
