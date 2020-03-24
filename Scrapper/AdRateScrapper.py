import requests
from bs4 import BeautifulSoup
import mysql.connector
from mysql.connector import Error
import datetime

# This contain all the Newspapers for which scrapping is done
newspaper = [
            "indianexpress", 
            "timesofindia", 
            "hindustantimes", 
            "hindu", 
            "telegraph", 
            "tribune"
            ]

# ad_category = ["matrimonial", "property", "recruitment", 
#                "business", "personal", "vehicles",
#                "announcement", "situation-wanted",
#                 "tenders", "to-rent", "travel", 
#                 "wedding-arrangements", "public-notice", 
#                 "court-or-marriage-notice", "share-certificate", 
#                 "change-of-name", "retail", "lost-and-found", 
#                 "education", "remembrance", "commercial-personal", 
#                 "marriage-bureau", "obituary", "astrology", "computers"]

# Matrimonial, obituary, public-notice, share-certificate and court-or-marriage-notice, tenders is outside of this due to some reasom

# These are ad categories for which scrapping is done for particular newspaper
ad_category = ["property",
               "recruitment", 
               "business",
               "personal",
               "vehicles",
               "announcement",
               "situation-wanted",
               "to-rent", "travel", 
                "wedding-arrangements", 
                "change-of-name", "retail",
                "lost-and-found", 
                "education", "remembrance",
                "commercial-personal", 
                "marriage-bureau", "astrology", 
                "computers"]



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
        for paper in newspaper:
            for category in ad_category:
                page = requests.get('https://{newspaper}.releasemyad.com/rates/{ad_category}'
                .format(newspaper = paper, ad_category = category))
                soup = BeautifulSoup(page.content, 'html.parser')
                
                #Selection Edition
                edition = soup.find_all('h1')
                newspaperLanguage = edition[-3].text.split(" ")[-2]
                edition = edition[2:-2]
                edition = edition[0:int(len(edition)/2)]
                for i in range(len(edition)):
                    edition[i] = edition[i].text

                # Selection Price
                price = soup.find_all('div', attrs={'class' : 'avai-td-price'})
                j = 1


                text_price_and_words = []
                display_price_and_words = []

                for i in price:
                    print(i.text)
                    if(j <= len(edition)):
                        # Text Classified Ad 
                        price = i.text.split(' / ')[0].split('.')[1]
                        words = i.text.split(' / ')[1].split(' ')[0]
                        text_price_and_words.append([price, words])
                    else:
                        # Display Ad
                        price = i.text.split('(')[0].split('.')[1]
                        inches = i.text.split('(')[1].split(' cm')[0]
                        display_price_and_words.append([price, inches])
                    j += 1

                print('{newspaper} --- {category}'.format(newspaper=paper, category=category))
                print(edition)
                print(text_price_and_words)
                print(display_price_and_words)
                print()
                
                # For Text Based
                for i in range(len(text_price_and_words)):

                    # SQL QUERY for inserting newspaper text ad rates
                    sql = "INSERT INTO adcollections (id, newspaperName, adCategory, \
                    adEdition, adType, adTextPrice, adTextWord, newspaperLanguage, createdAt, updatedAt) \
                        VALUES ({id}, '{newspaper}', '{category}', '{edition}', 'text',\
                            '{textPrice}', '{textWord}', '{newspaperLanguage}', '{createdAt}', '{updatedAt}')".format(id=k, newspaper=paper, category=category, edition=edition[i], 
                            textPrice=text_price_and_words[i][0], textWord=text_price_and_words[i][1], 
                            newspaperLanguage=newspaperLanguage,
                            createdAt=datetime.datetime.now(), updatedAt=datetime.datetime.now())
                    k += 1
                    cursor.execute(sql)
                
                # # For Display
                for i in range(len(display_price_and_words)):

                    # SQL QUERY for inserting newspaper display ad rates
                    sql = "INSERT INTO adcollections (id, newspaperName, adCategory, \
                        adEdition, adType, adDisplayPrice, adDisplaySize, newspaperLanguage, createdAt, updatedAt) \
                        VALUES ({id}, '{newspaper}', '{category}', '{edition}', 'display', \
                            '{displayPrice}', '{displaySize}', '{newspaperLanguage}', '{createdAt}', '{updatedAt}')".format(id=k, newspaper=paper, category=category, edition=edition[i], 
                            displayPrice=display_price_and_words[i][0], displaySize=display_price_and_words[i][1],
                            newspaperLanguage=newspaperLanguage,
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



# Test Code -- Helps In Implementing Scrapper
# working on single newspaper and single category to reduce complexity

# page = requests.get('https://{newspaper}.releasemyad.com/rates/{ad_category}'.format(newspaper = newspaper[0], ad_category = ad_category[0]))
# soup = BeautifulSoup(page.content, 'html.parser')

# #Selection Edition
# # Some Bug here
# edition = soup.find_all('h1')
# # Some Bug may occur in this code
# language = edition[-3].text.split(" ")[-2]
# #edition = edition[2: -3] 
# edition = edition[2:-2]
# edition = edition[0:int(len(edition)/2)]
# for i in range(len(edition)):
#     edition[i] = edition[i].text

# # Selection Price
# price = soup.find_all('div', attrs={'class' : 'avai-td-price'})
# j = 1

# for i in price:
#     print(i.text)

# text_price_and_words = []
# display_price_and_words = []

# for i in price:
#     print(i.text)
#     if(j <= len(edition)):
#         # Text Classified Ad 
#         price = i.text.split(' / ')[0].split('.')[1]
#         words = i.text.split(' / ')[1].split(' ')[0]
#         print(words)
#         text_price_and_words.append([price, words])
#     else:
#         # Display Ad
#         price = i.text.split('(')[0].split('.')[1]
#         inches = i.text.split('(')[1].split(' cm')[0]
#         display_price_and_words.append([price, inches])
#     j += 1



# try:
#     connection = mysql.connector.connect(host='localhost',
#                                          database='myadsense_db',
#                                          user='root',
#                                          password='root')
#     if connection.is_connected():
#         db_Info = connection.get_server_info()
#         print("Connected to MySQL Server version ", db_Info)
#         cursor = connection.cursor()
#         k = 1
#         # For Text Based
#         for i in range(len(text_price_and_words)):
#             sql = "INSERT INTO adcollections (id, newspaperName, adCategory, adEdition, adType, adTextPrice, adTextWord, createdAt, updatedAt) \
#                 VALUES ({id}, '{newspaper}', '{category}', '{edition}', 'text', '{textPrice}', '{textWord}', '{createdAt}', '{updatedAt}')".format(id=k, newspaper=newspaper[0], category=ad_category[0], edition=edition[i], textPrice=text_price_and_words[i][0], textWord=text_price_and_words[i][1], createdAt=datetime.datetime.now(), updatedAt=datetime.datetime.now())
#             k += 1
#             cursor.execute(sql)
        
#         # # For Display
#         for i in range(len(display_price_and_words)):
#             sql = "INSERT INTO adcollections (id, newspaperName, adCategory, adEdition, adType, adDisplayPrice, adDisplaySize, createdAt, updatedAt) \
#                 VALUES ({id}, '{newspaper}', '{category}', '{edition}', 'display', '{displayPrice}', '{displaySize}', '{createdAt}', '{updatedAt}')".format(id=k, newspaper=newspaper[0], category=ad_category[0], edition=edition[i], displayPrice=display_price_and_words[i][0], displaySize=display_price_and_words[i][1], createdAt=datetime.datetime.now(), updatedAt=datetime.datetime.now())
            
#             k += 1
#             cursor.execute(sql)
        
#         connection.commit()
# except Error as e:
#     print("Error while connecting to MySQL", e)
# finally:
#     if (connection.is_connected()):
#         # cursor.close()
#         connection.close()
#         print("MySQL connection is closed")