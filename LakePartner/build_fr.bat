ant -f build_fr.xml
rm LakePartner_fr.2.0-concatenate.js
rm LakePartner_fr.2.0-concatenate-min.js
cp LakePartner_fr.2.0-min.js /Y/web/LakePartner/fr
rm LakePartner_fr.2.0-min.js
cp LakePartner_fr.htm /Y/web/LakePartner/fr
mv /Y/web/LakePartner/fr/LakePartner_fr.htm  /Y/web/LakePartner/fr/LakePartner.htm
