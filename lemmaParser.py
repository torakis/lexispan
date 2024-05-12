#!/usr/bin/env python
from bs4 import BeautifulSoup
import glob
from xlsx2html import xlsx2html
import os
import shutil
import re
from xml.sax import saxutils as su

# #gFiles

# define the name of the directory to be created
current_path = os.getcwd()
gFilespath = current_path+ "/gFiles"

if not os.path.exists(gFilespath):
    # If it doesn't exist, create it
    os.makedirs(gFilespath)
    print("Directory 'gFiles' created successfully.")


for filename in glob.glob('G*.htm'):
    with open(filename, 'r+', encoding='cp1253') as f:
        filepath = os.path.join(gFilespath, filename+'l')

        contents = f.read()
        f.seek(0)
        soup = BeautifulSoup(contents, 'lxml')
        z = soup
        x = str(z).splitlines()
        if('<body><tr>' in x[0] or '<body><tr>' in x[1]):
            break
        if(soup.head is not None):
            soup.head.decompose()
        if(soup.thead is not None):
            soup.thead.decompose()
        if(soup.header is not None):
            soup.header.decompose()

        # for span in soup.findAll('span', style='mso-list:Ignore'):
        #         print("found")
        #         # val = "<font color=\"#000000\" size=\"3\">" + td.get_text() + "</font>"
        #         # td.string = val
        
        with open(filepath, "w", encoding='utf8') as output:
            header = "<meta http-equiv='content-type' content='text/html; charset=utf-8'/>"+"\n"



            

            x = str(soup.body).splitlines()
            # x.insert(2, "<p></p>")
            data = '\n'.join(map(str, x))
            data = data.replace("<div class=\"Section1\">", "")

            data = data.replace("G</span><span style='mso-bidi-font-size:\n10.0pt;font-family:\"Calibri\",\"sans-serif\""+
            ";mso-ascii-theme-font:minor-latin;\nmso-hansi-theme-font:minor-latin;mso-bidi-theme-font:minor-latin'>", "G")
            data = data.replace("G</span></b><b style=\"mso-bidi-font-weight:normal\"><span style='mso-bidi-font-size:10.0pt;font-family:\"Calibri\",\"sans-serif\""+
            ";mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-theme-font:minor-latin'>", "G")
            data = data.replace("G</span><span style='font-family:\"Calibri\",\"sans-serif\";mso-ascii-theme-font:"+
            "minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-theme-font:minor-latin'>", "G")
            data = data.replace("G</span><span style='font-family:\"Calibri\",\"sans-serif\";"+
            "mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-theme-font:minor-latin'>", "G")
            data = data.replace("G</span><span style='font-family:\"Calibri\",\"sans-serif\";mso-ascii-theme-font:"+
            "minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-theme-font:minor-latin'>", "G")
            data = data.replace("G</span><span style='font-family:\"Calibri\",\"sans-serif\";"+
            "mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-theme-font:minor-latin'>", "G")
            data = data.replace("G</span><span style='mso-bidi-font-size:10.0pt;\nfont-family:\"Calibri\",\"sans-serif\";"+
            "mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:\nminor-latin;mso-bidi-theme-font:minor-latin'>", "G")
            data = data.replace("G</span><span style='font-family:\"Calibri\",\"sans-serif\";color:black'>", "G")
            data = data.replace("G</span><span style='font-family:\"Calibri\",\"sans-serif\"'>", "G")
            data = data.replace("G</span><span style='font-family:\"Calibri\",\"sans-serif\";\nmso-ascii-theme-font:minor-latin;"+
            "mso-hansi-theme-font:minor-latin;mso-bidi-theme-font:\nminor-latin'>", "G")
            data = data.replace("G</span><span style='font-family:\"Calibri\",\"sans-serif\";mso-ascii-theme-font:\n"+
            "minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-theme-font:minor-latin'>", "G")
            
            

            data = data.replace("&lt;![if !supportLists]&gt;", "")
            data = data.replace("&lt;![endif]&gt;", "")



            lemmas = re.findall("G[0-9]+", data)
            for lemma in lemmas[1:]:
                print(lemma)
                data = data.replace(lemma, "<a href=\"https://lexispan.eu/new-testament/?"+lemma+"\" target=\"_blank\">"+lemma+"</a>")

            output.write(header + data)





# define the name of the directory to be created
gTablespath = current_path + "/gTables"

if not os.path.exists(gTablespath):
    # If it doesn't exist, create it
    os.makedirs(gTablespath)
    print("Directory 'gTables' created successfully.")


# #tables

for excel in glob.glob('G*tbl.xlsx'):

    out_stream = xlsx2html(excel)
    out_stream.seek(0)
    html=out_stream.read()
    name=excel.split('.')[0]
    htmlName = name+'.html'
    tablepath = os.path.join(gTablespath, htmlName)
    with open(tablepath, "w", encoding="utf-8") as f:
        f.write(html)

    with open(tablepath, 'r+', encoding='utf-8') as f:        
        contents = f.read()
        f.seek(0)
        soup = BeautifulSoup(contents, 'lxml')
        z = soup
        x = str(z).splitlines()
        if('<body><tr>' in x[0] or '<body><tr>' in x[1]): 
            break
        if(soup.head is not None):
            soup.head.decompose()
        if(soup.thead is not None):
            soup.thead.decompose()
        if(soup.header is not None):
            soup.header.decompose()
        
        for td in soup.body.table.findAll("td", {"id":{"Φύλλο1!A2","Φύλλο1!B2"}}):
            val = "<font color=\"#000000\" size=\"3\">" + td.get_text() + "</font>"
            td.string = val

        header = "<meta http-equiv='content-type' content='text/html; charset=utf-8'/>"+"\n"
        rows = soup.body.table.find_all('tr', recursive=False)
        printRows='\n'.join(map(str, rows[1:]))
        printRows = printRows.replace("border-bottom: none;", "border-bottom-style: solid;")
        printRows = printRows.replace("border-left: none;", "border-left-style: solid;")
        printRows = printRows.replace("border-right: none;", "border-right-style: solid;")
        printRows = printRows.replace("border-top: none;", "border-top-style: solid;")
        printRows = printRows.replace("font-size: 12.0px;", "")
        printRows = printRows.replace("&lt;", "<")
        printRows = printRows.replace("&gt;", ">")
        f.write(header+(printRows))        
        f.truncate()
        
        # with open(tablepath, "w", encoding='utf8') as output:
        #     output.write(header+(printRows))


# for filename in glob.glob('G*tbl.html'):
#     with open(filename, 'r+', encoding='utf8') as f:
#         contents = f.read()
#         f.seek(0)
#         soup = BeautifulSoup(contents, 'lxml')
#         z = soup
#         x = str(z).splitlines()
#         if('<body><tr>' in x[0] or '<body><tr>' in x[1]): 
#             break
#         if(soup.head is not None):
#             soup.head.decompose()
#         if(soup.thead is not None):
#             soup.thead.decompose()
#         if(soup.header is not None):
#             soup.header.decompose()
#         z = soup.tbody
#         x = str(z).splitlines()
#         x=x[1:-1]
#         mystr = '\n'.join(map(str, x))
#         header = "<meta http-equiv='content-type' content='text/html; charset=utf-8'/>"+"\n"
#         f.write(header+mystr)
#         f.truncate()




# for filename in glob.glob('G*.htm'):
#     with open(filename, 'r+', encoding='utf8') as f:        
#         contents = f.read()
#         f.seek(0)
#         soup = BeautifulSoup(contents, 'lxml')
#         z = soup
#         x = str(z).splitlines()
#         if('<body><tr>' in x[0] or '<body><tr>' in x[1]): 
#             break
#         if(soup.head is not None):
#             soup.head.decompose()
#         if(soup.thead is not None):
#             soup.thead.decompose()
#         if(soup.header is not None):
#             soup.header.decompose()
#         header = "<meta http-equiv='content-type' content='text/html; charset=utf-8'/>"+"\n"
#         f.write(header+str(soup.body))
#         f.truncate()
        
# for filename in glob.glob('G*.html'):
#     with open(filename, 'r+', encoding='utf8') as f:        
#         contents = f.read()
#         f.seek(0)
#         soup = BeautifulSoup(contents, 'lxml')
#         z = soup
#         x = str(z).splitlines()
#         if('<body><tr>' in x[0] or '<body><tr>' in x[1]): 
#             break
#         if(soup.head is not None):
#             soup.head.decompose()
#         if(soup.thead is not None):
#             soup.thead.decompose()
#         if(soup.header is not None):
#             soup.header.decompose()
#         header = "<meta http-equiv='content-type' content='text/html; charset=utf-8'/>"+"\n"
#         f.write(header+str(soup.body))
#         f.truncate()

