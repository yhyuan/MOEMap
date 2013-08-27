ant
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar LakePartner_en.2.0-concatenate.js -o LakePartner_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar LakePartner_fr.2.0-concatenate.js -o LakePartner_fr.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar LakePartner_Accessible_en.2.0-concatenate.js -o LakePartner_Accessible_en.2.0-min.js
java -jar ../MOEMap/build/yuicompressor-2.4.7.jar LakePartner_Accessible_fr.2.0-concatenate.js -o LakePartner_Accessible_fr.2.0-min.js
cp LakePartner_en.2.0-min.js /Y/web/LakePartner
cp LakePartner_fr.2.0-min.js /Y/web/LakePartner
cp LakePartner_Accessible_en.2.0-min.js /Y/web/LakePartner
cp LakePartner_Accessible_fr.2.0-min.js /Y/web/LakePartner
rm LakePartner_en.2.0-concatenate.js
rm LakePartner_fr.2.0-concatenate.js
rm LakePartner_en.2.0-min.js
rm LakePartner_fr.2.0-min.js
rm LakePartner_Accessible_en.2.0-concatenate.js
rm LakePartner_Accessible_fr.2.0-concatenate.js
rm LakePartner_Accessible_en.2.0-min.js
rm LakePartner_Accessible_fr.2.0-min.js
