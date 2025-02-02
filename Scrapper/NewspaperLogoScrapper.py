import requests
from bs4 import BeautifulSoup
import mysql.connector
from mysql.connector import Error
import datetime
import urllib.request
import base64
import os
import shutil


# Encoding image to base64
def get_base64_encoded_image(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read())

newspaper = [
            "indianexpress", 
            "timesofindia", 
            "hindustantimes", 
            "hindu", 
            "telegraph", 
            "tribune"
            ]


try:
    connection = mysql.connector.connect(host='localhost',
                                    database='myadsense_db',
                                    user='root',
                                    password='root')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        k = 1

        #Creates Fresh Newspaper Logo Folder
        os.mkdir("NewspaperLogo")
        for paper in newspaper:
            # # Querying Website based on Paper Name
            page = requests.get('https://{newspaper}.releasemyad.com/'.format(newspaper=paper))
            soup = BeautifulSoup(page.content, 'html.parser')
                
            # Selecting Newspaper Image Element
            newspaperLogoElement = soup.find_all('img')[2]
            print(newspaperLogoElement['src'])
            urllib.request.urlretrieve('{newspaperLogo}'.format(newspaperLogo = newspaperLogoElement['src']), "NewspaperLogo/{newspaper}.jpg".format(newspaper=paper))    
            # Encode image to base64
            newspaperLogo = str(get_base64_encoded_image("NewspaperLogo/{newspaper}.jpg".format(newspaper=paper)))[1:]
            

            # SQL QUERY for inserting newspaper text ad rates
            sql = "INSERT INTO newspaperlogos (id, newspaperName, newspaperLogo, createdAt, updatedAt) \
                VALUES ({id}, '{newspaper}', {newspaperLogo}, '{createdAt}', '{updatedAt}')".format(id=k, newspaper=paper, newspaperLogo=newspaperLogo,
                    createdAt=datetime.datetime.now(), updatedAt=datetime.datetime.now())
            k += 1
            cursor.execute(sql)  
        connection.commit()
except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if (connection.is_connected()):
        # cursor.close()
        connection.commit()
        connection.close()
        print("MySQL connection is closed")





# files = glob.glob('/Scrapper/NewspaperLogo/**.jpg', recursive=True)

# for f in files:
#     try:
#         os.remove(f)
#         print('hi')
#     except OSError as e:
#         print("Error: %s : %s" % (f, e.strerror))

# Deletes NewspaperLogo Folder
try:
    shutil.rmtree("NewspaperLogo")
except OSError as e:
    print ("Error: %s - %s." % (e.filename, e.strerror))


# For Testing And Debugging Purposes
# for paper in newspaper:
#     # # Querying Website based on Paper Name
#     page = requests.get('https://{newspaper}.releasemyad.com/'.format(newspaper=paper))
#     soup = BeautifulSoup(page.content, 'html.parser')
        
#     # Selecting Newspaper Image Element
#     newspaperLogoElement = soup.find_all('img')[2]
#     print(newspaperLogoElement['src'])
#     urllib.request.urlretrieve('{newspaperLogo}'.format(newspaperLogo = newspaperLogoElement['src']), "{newspaper}.jpg".format(newspaper=paper))    
#     # Encode image to base64
#     print(get_base64_encoded_image("{newspaper}.jpg".format(newspaper=paper)))
#     # print(soup.prettify())
