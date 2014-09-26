ant -f build_fr.xml
rm FarmerMarkets_fr.2.0-concatenate.js
rm FarmerMarkets_fr.2.0-concatenate-min.js
cp FarmerMarkets_fr.2.0-min.js /Y/web/FarmerMarkets/fr
rm FarmerMarkets_fr.2.0-min.js
cp FarmerMarkets_fr.htm /Y/web/FarmerMarkets/fr
mv /Y/web/FarmerMarkets/fr/FarmerMarkets_fr.htm  /Y/web/FarmerMarkets/fr/FarmerMarkets.htm
