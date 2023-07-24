import requests 

#################################### Divar 
##### Verify user
# res = requests.post("http://127.0.0.1:3000/divar_send_sms", json = { "phone" : "9138780275"}).json()
# if res["status"] == 'true':
#     code = input("code: ")
#     res = requests.post("http://127.0.0.1:3000/divar_verify_sms", json = { "phone" : "9138780275","code": code})
#     print(res.text)
#     # { status : "true" or "false" , "token": "....."}


######### Post
# requested = {
#     "token": "",
#     "city": "اصفهان",
#     "category": "apartment-rent", # apartment-sell
#     "images": [],
#     "size": 2555,
#     "user_type": "شخصی", # مشاور املاک
#     "rent_to_single": "true",
#     "rooms": "چهار",
#     "year": "۱۳۹۴",
#     "floor": "0",
#     "elevator": "false",
#     "parking": "true",
#     "warehouse": "true",
#     "national_id": "1273746643",
#     "title": "ملک برای فروش",
#     "description": "مناسب و مجهز",
# }
# res = requests.post("http://127.0.0.1:3000/divar_post", json = requested)
# # { "status": "true", "message": "posted" }
# print(res.text)


################ Cities
# res = requests.get("http://127.0.0.1:3000/divar_cities").json()
# print(res)



#################################### Sheypoor
##### Verify user
res = requests.post("http://127.0.0.1:3000/sheypoor_send_sms", json = { "phone" : "9138780275"}).json()
print(res)
if res["status"] == 'true':
    code = input("code: ")
    token = input("token: ")
    res = requests.post("http://127.0.0.1:3000/sheypoor_verify_sms", json = {"code": code ,"token": token})
    # print(res.text)
    # { status : "true" or "false" , "token": "....."}