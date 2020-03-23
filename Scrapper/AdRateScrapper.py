import requests
from bs4 import BeautifulSoup

newspaper = ["indianexpress"]

# ad_category = ["matrimonial", "property", "recruitment", 
#                "business", "personal", "vehicles",
#                "announcement", "situation-wanted",
#                 "tenders", "to-rent", "travel", 
#                 "wedding-arrangements", "public-notice", 
#                 "court-or-marriage-notice", "share-certificate", 
#                 "change-of-name", "retail", "lost-and-found", 
#                 "education", "remembrance", "commercial-personal", 
#                 "marriage-bureau", "obituary", "astrology", "computers"]

# Matrimonial and obituary is outside of this due to some reasom

ad_category = ["property", "recruitment", 
               "business", "personal", "vehicles",
               "announcement", "situation-wanted",
                "tenders", "to-rent", "travel", 
                "wedding-arrangements", "public-notice", 
                "court-or-marriage-notice", "share-certificate", 
                "change-of-name", "retail", "lost-and-found", 
                "education", "remembrance", "commercial-personal", 
                "marriage-bureau", "astrology", "computers"]

for paper in newspaper:
    for category in ad_category:
        page = requests.get('https://{newspaper}.releasemyad.com/rates/{ad_category}'.format(newspaper = paper, ad_category = category))
        soup = BeautifulSoup(page.content, 'html.parser')
        
        #Selection Edition
        edition = soup.find_all('h1')
        edition = edition[2:-2]
        edition = edition[0:int(len(edition)/2)]

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



# Test Code -- Helps In Implementing Scrapper
# working on single newspaper and single newspaper to reduce complexity

# page = requests.get('https://{newspaper}.releasemyad.com/rates/{ad_category}'.format(newspaper = newspaper[0], ad_category = ad_category[0]))
# soup = BeautifulSoup(page.content, 'html.parser')

# #Selection Edition
# # Some Bug here
# edition = soup.find_all('h1')
# #edition = edition[2: -3] 
# edition = edition[2:-2]
# edition = edition[0:int(len(edition)/2)]
# for i in edition:
#     print(i)

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






