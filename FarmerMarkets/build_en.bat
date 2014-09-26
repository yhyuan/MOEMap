ant -f build_en.xml
rm FarmerMarkets_en.2.0-concatenate.js
rm FarmerMarkets_en.2.0-concatenate-min.js
cp FarmerMarkets_en.2.0-min.js /Y/web/FarmerMarkets/en
rm FarmerMarkets_en.2.0-min.js
cp FarmerMarkets_en.htm /Y/web/FarmerMarkets/en
mv /Y/web/FarmerMarkets/en/FarmerMarkets_en.htm  /Y/web/FarmerMarkets/en/FarmerMarkets.htm
