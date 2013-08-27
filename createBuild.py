# This python script reads the files in Templates folder
# and generate the threes files to build an application. 
# for example, the user can run Python createBuild.py DistrictLocator
# it will create three files in DistrictLocator folder:
#     build.bat
#     build.properties
#     build.xml
# User can run build.bat to create a minified file in development server. 

#!/usr/bin/python

import sys
import fileinput

if (len(sys.argv) != 2):
	print "Please use Python createBuild.py ApplicationName to create build files"
	sys.exit(2)
application = sys.argv[1]

text_file = open(application + "/build.bat", "w")
for line in fileinput.input("Templates/build.bat"):
	text_file.write(line.replace("[APPLICATION]", application))
text_file.close()

text_file = open(application + "/build.properties", "w")
for line in fileinput.input("Templates/build.properties"):
	text_file.write(line.replace("[APPLICATION]", application))
text_file.close()

text_file = open(application + "/build.xml", "w")
for line in fileinput.input("Templates/build.xml"):
	text_file.write(line.replace("[APPLICATION]", application))
text_file.close()

   