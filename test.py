import requests 

# #################################### Divar 
#### Verify user
# res = requests.post("http://127.0.0.1:3000/divar/send_sms", json = { "phone" : "9138780275"}).json()
# if res["status"] == 'true':
#     code = input("code: ")
#     res = requests.post("http://127.0.0.1:3000/divar/verify_sms", json = { "phone" : "9138780275","code": code, "national_id":"1273746643"})
#     print(res.text)
    # { status : "true" or "false" , "token": "....."}

### Distincs
# res = requests.get("http://127.0.0.1:3000/divar/cities?districts=اصفهان")
# print(res.text)

######## Post
# requested = {
#     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMDkxMzg3ODAyNzUiLCJpc3MiOiJhdXRoIiwidmVyaWZpZWRfdGltZSI6MTY5MDQ3NDY2OCwiaWF0IjoxNjkwNDc0NjY4LCJleHAiOjE2OTE3NzA2NjgsInVzZXItdHlwZSI6InBlcnNvbmFsIiwidXNlci10eXBlLWZhIjoiXHUwNjdlXHUwNjQ2XHUwNjQ0IFx1MDYzNFx1MDYyZVx1MDYzNVx1MDZjYyIsInNpZCI6IjM4NjM5ZWE5LTkwZjUtNDY3NS1iMjUzLTI2ZTA3NTdlZjY0MiJ9.86lxN2lYzT3MGxAbgfbpkJY2NCG_X98D8WQNfvBJvXM",
#     "city": "اصفهان",
#     "districts": "تالار",
#     "category": "apartment-sell", # apartment-sell
#     "images": [],
#     "size": 10000,
#     "sign": {"payload":{"verification_state":"VERIFIED","phone":"09138780275","identification_id":"1273746643","verified_at":"2023-07-27T16:17:49.337477Z"},"sign":"347238b1f6d0c82c236ac67d81c46adeb3b7be14e5a284c2a7a13a8fbcac36cc5ce25a5ff5934c8647f05e89543e7a5d30d6eeee1aafed0de0d29da61c434bb6273ff8a19ed76a68e148a60ee03c2deb1c02849da57d51699e864bac10420e75ac4463f23ffe5738a594575cac4bd456d1b27b34ecfbca3eb1a0542f2fee3bbc"},
#     "phone": "9138780275",
#     "user_type": "شخصی", # مشاور املاک
#     "rent_to_single": "true",
#     "rooms": "دو",
#     "year": "۱۳۸۸",
#     "price":200000000000,
#     "floor": "5",
#     "elevator": "false",
#     "parking": "true",
#     "warehouse": "true",
#     "national_id": "1273746643",
#     "title": "55555555555555555",
#     "description": "000000000000000000000",
# }
# res = requests.post("http://127.0.0.1:3000/divar/post", json = requested)
# # # { "status": "true", "message": "posted" , data = { mng_token : 0 } }
# print(res.text)

# ################ Cities
# res = requests.get("http://127.0.0.1:3000/divar/cities").json()
# print(res)

##### upgrade 
# res = requests.post("http://127.0.0.1:3000/divar/upgrade", json = {
#     "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMDkxMzg3ODAyNzUiLCJpc3MiOiJhdXRoIiwidmVyaWZpZWRfdGltZSI6MTY5MDQ3NDY2OCwiaWF0IjoxNjkwNDc0NjY4LCJleHAiOjE2OTE3NzA2NjgsInVzZXItdHlwZSI6InBlcnNvbmFsIiwidXNlci10eXBlLWZhIjoiXHUwNjdlXHUwNjQ2XHUwNjQ0IFx1MDYzNFx1MDYyZVx1MDYzNVx1MDZjYyIsInNpZCI6IjM4NjM5ZWE5LTkwZjUtNDY3NS1iMjUzLTI2ZTA3NTdlZjY0MiJ9.86lxN2lYzT3MGxAbgfbpkJY2NCG_X98D8WQNfvBJvXM",
#     "post_id":"AZCP_DuTrll22R"
#     })
# print(res.text)


################## Sheypoor
#### Verify user
# res = requests.post("http://127.0.0.1:3000/sheypoor/send_sms", json = { "phone" : "9138780275"}).json()
# print(res)
# if res["status"] == 'true':
#     code = input("code: ")
#     token = input("token: ")
#     res = requests.post("http://127.0.0.1:3000/sheypoor/verify_sms", json = { "phone" : "9138780275","code": code, "token": token})
#     print(res.text)
#     { status : "true" or "false" , "token": ".....", "access_token":"....."}
# res = requests.post("http://127.0.0.1:3000/sheypoor/post", json = { 
#     "year": "1402",
#     "rooms": "4",
#     "access_token":"b9beb60260f5c05ba1d8f3efdbb38999",
#     "phone": "09138780275",
#     "province": "اصفهان",
#     "city":"اصفهان",
#     "region":"سیچان",
#     "parking":"false",
#     "warehouse":"false",
#     "elevator":"false",
#     "size":"10000",
#     "price":"1000000",
#     "description":"Descritpion .....................................",
#     "category":"خرید و فروش ویلا",
#     # "nama": [], # سنگی .... 
#     # "kitchen": [], # هود .... 
#     # "parking_count": [], # بدون پارکینگ
#     # "floor_loc": [], # شمالی ...
#     # "situation": "", # مالک .... 
#     # "floorth":[],  # همکف .... 
#     # "others" :[], # کمد دیواری .... 
#     # "others_1": [], # بالکن .... 
#     # "building_type": "برج",
#     # "cabinet": [], # فلزی
#     # "file_situation": "ندارد", # نوع سند
#     # "earth_loc": [], # شمالی ....
#     # "entertainment": [], # تفریحی
#     # "security": [], # امنیتی
#     # "sports": [], # ورزشی
#     # "systems": [], # پیکیج ....
#     # "capacity": 5, # ظرفیت
#     # "kafpush": [], # پارکت...
#     # "rent": 0, # اجاره
#     # "credit": 0, # رهن
#     # "rooms_daily": 100000, # قیمت روزانه
#     "token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJWRVJJRlkifQ.eyJqdGkiOiI2NGMyZmFiNzcxYTgwMS42MTU1MDE2MCIsImlzcyI6InNoZXlwb29yIiwiYXVkIjoic2hleXBvb3IiLCJpYXQiOjE2OTA0OTk3NjcsImV4cCI6MTY5MDUwMDM2NywibmJmIjoxNjkwNDk5NzY3LCJtb2JpbGUiOiIwOTEzODc4MDI3NSIsInVzZXJJZCI6IjE3Nzg4MjMifQ.SutwdNE7bLJEMbR7MAsz6s2rpLrTWIQNF9_pjhD03Ko"}).json()
# print(res)



############# PUBLISH
# res = requests.post("http://127.0.0.1:3000/sheypoor/publish", json = { 
#     "post_id": "429145913",
#     "access_token":"b9beb60260f5c05ba1d8f3efdbb38999",
#     "phone": "09138780275",
#     "region":"سیچان",
#     "price":"1000000",
#     "description":"Descritpion .....................................",
#     "category":"خرید و فروش ویلا",
#     "token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJWRVJJRlkifQ.eyJqdGkiOiI2NGMyZmFiNzcxYTgwMS42MTU1MDE2MCIsImlzcyI6InNoZXlwb29yIiwiYXVkIjoic2hleXBvb3IiLCJpYXQiOjE2OTA0OTk3NjcsImV4cCI6MTY5MDUwMDM2NywibmJmIjoxNjkwNDk5NzY3LCJtb2JpbGUiOiIwOTEzODc4MDI3NSIsInVzZXJJZCI6IjE3Nzg4MjMifQ.SutwdNE7bLJEMbR7MAsz6s2rpLrTWIQNF9_pjhD03Ko"}).json()
# print(res)

############# PUBLISH
# res = requests.post("http://127.0.0.1:3000/sheypoor/upgrade", json = { 
#     "post_id": "429145913",
#     "access_token":"b9beb60260f5c05ba1d8f3efdbb38999",
#     "method":"refresh", // vitrine_48, vitrine_24 , instant_tag, refresh
#     "token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJWRVJJRlkifQ.eyJqdGkiOiI2NGMyZmFiNzcxYTgwMS42MTU1MDE2MCIsImlzcyI6InNoZXlwb29yIiwiYXVkIjoic2hleXBvb3IiLCJpYXQiOjE2OTA0OTk3NjcsImV4cCI6MTY5MDUwMDM2NywibmJmIjoxNjkwNDk5NzY3LCJtb2JpbGUiOiIwOTEzODc4MDI3NSIsInVzZXJJZCI6IjE3Nzg4MjMifQ.SutwdNE7bLJEMbR7MAsz6s2rpLrTWIQNF9_pjhD03Ko"}).json()
# print(res)