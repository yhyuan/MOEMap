ant -f build_en.xml
rm IDS_Entry_en.2.0-concatenate.js
rm IDS_Entry_en.2.0-concatenate-min.js
cp IDS_Entry_en.2.0-min.js /Y/web/IDS_Entry/en
rm IDS_Entry_en.2.0-min.js
cp IDS_Entry_en.htm /Y/web/IDS_Entry/en
mv /Y/web/IDS_Entry/en/IDS_Entry_en.htm  /Y/web/IDS_Entry/en/IDS_Entry.htm
