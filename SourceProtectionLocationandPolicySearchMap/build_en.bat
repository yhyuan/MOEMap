ant -f build_en.xml
rm SourceProtectionLocationandPolicySearchMap_en.2.0-concatenate.js
rm SourceProtectionLocationandPolicySearchMap_en.2.0-concatenate-min.js
cp SourceProtectionLocationandPolicySearchMap_en.2.0-min.js /Y/web/SourceProtectionLocationandPolicySearchMap/en
rm SourceProtectionLocationandPolicySearchMap_en.2.0-min.js
cp SourceProtectionLocationandPolicySearchMap_en.htm /Y/web/SourceProtectionLocationandPolicySearchMap/en
mv /Y/web/SourceProtectionLocationandPolicySearchMap/en/SourceProtectionLocationandPolicySearchMap_en.htm  /Y/web/SourceProtectionLocationandPolicySearchMap/en/SourceProtectionLocationandPolicySearchMap.htm