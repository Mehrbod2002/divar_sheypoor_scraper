import request from 'request';
import express from 'express';
import fetch from 'node-fetch';
import cities from './cities.js';
import { config } from 'dotenv';
const app = express();
config();
app.use(express.json());

app.post("/sheypoor_send_sms", (req, res) => {
    if (req.body.phone && req.body.phone.length == 10 && req.body.phone.substring(0, 2) == "91") {
        fetch("https://www.sheypoor.com/api/protools/v2.1/auth/register", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "fa",
                "Content-Type": "application/json",
                "X-Ticket": "null",
                "protools-version": "2.1",
                "protools-client-source": "web",
                "protools-client-os": "web",
                "protools-env": "production",
                "source": "protools",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.sheypoor.com/pro/real-estate/login",
            "body": JSON.stringify({ "cellphone": req.body.phone, "user_type": "real-estate" }),
            "method": "POST",
            "mode": "cors"
        }).then(async (response) => {
            if (response.status != 200 || !response.ok) {
                res.json({ "status": "false", "message": "failed_to_send_sms" });
            } else {
                response = await response.json();
                res.json({ "status": "true", "message": "sms_code_sent", "verify_token": response.token });
            }
        }).catch((_err) => {
            res.json({ "status": "false", "message": "failed_to_send_sms" });
        });
    } else {
        res.json({ "status": "false", "message": "invalid_phone" });
    }
});

app.post("/sheypoor_verify_sms", (req, res) => {
    if (req.body.phone && req.body.phone.length == 10 && req.body.phone.substring(0, 2) == "91" && req.body.code && req.body.code.length == 4 && /^\d+$/.test(req.body.code) && req.body.token) {
        fetch("https://www.sheypoor.com/api/protools/v2.1/auth/authorize", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "fa",
                "Content-Type": "application/json",
                "X-Ticket": "null",
                "protools-version": "2.1",
                "protools-client-source": "web",
                "protools-client-os": "web",
                "protools-env": "production",
                "source": "protools",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.sheypoor.com/pro/real-estate/login",
            "body": JSON.stringify({ "grant_type": "password", "username": req.body.token, "scope": "full", "password": req.body.code }),
            "method": "POST",
            "mode": "cors"
        }).then(async (response) => {
            if (response.status != 200 || !response.ok) {
                res.json({ "status": "false", "message": "invalid_phone_and_code" });
            } else {
                response = await response.json();
                res.json({ "status": "true", "message": "done", "token": response.access_token, "expire": response.expires_in + new Date().getTime() });
            }
        }).catch((_err) => {
            res.json({ "status": "false", "message": "invalid_phone_and_code" });
        });
    } else {
        res.json({ "status": "false", "message": "invalid_phone_and_code" });
    }
});

app.post("/sheypoor_post", (req, res) => {
    const url = 'https://www.sheypoor.com/api/protools/v2.1/listings';
    const headers = {
        'Host': 'www.sheypoor.com',
        'Content-Length': 0,
        'Sec-Ch-Ua': '"Not A(Brand";v="24", "Chromium";v="110"',
        'Protools-Client-Source': 'web',
        'Accept-Language': 'fa',
        'Source': 'protools',
        'Sec-Ch-Ua-Mobile': '?0',
        'Protools-Version': '2.1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36',
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'X-Ticket': 'b9beb60260f5c05ba1d8f3efdbb38999',
        'Protools-Env': 'production',
        'Protools-Client-Os': 'web',
        'Sec-Ch-Ua-Platform': '"Linux"',
        'Origin': 'https://www.sheypoor.com',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://www.sheypoor.com/pro/real-estate/file/new',
        'Accept-Encoding': 'gzip, deflat',
        'Cookie': `verify_token=Bearer+${req.body.token}`,
    }
    const category = {
        "خرید و فروش ویلا": 44586, "رهن و اجاره خانه و آپارتمان": 43606, "خرید و فروش خانه و آپارتمان": 43604,
        "اجاره کوتاه مدت ویلا، سوئیت": 44585, "رهن و اجاره اداری، تجاری و صنعتی": 43607, "خرید و فروش اداری، تجاری و صنعتی": 43605,
        "زمین و باغ": 44099
    }
    var years = {
        "1370": "455230",
        "1371": "455229",
        "1372": "455228",
        "1373": "455227",
        "1374": "455226",
        "1375": "455225",
        "1376": "455224",
        "1377": "455223",
        "1378": "455222",
        "1379": "455221",
        "1380": "455220",
        "1381": "455219",
        "1382": "455218",
        "1383": "455217",
        "1384": "455216",
        "1385": "455215",
        "1386": "455214",
        "1387": "455213",
        "1388": "455212",
        "1389": "455211",
        "1390": "455210",
        "1391": "455209",
        "1392": "455208",
        "1393": "455207",
        "1394": "455206",
        "1395": "455205",
        "1396": "455204",
        "1397": "455203",
        "1398": "455202",
        "1399": "455201",
        "1400": "455200",
        "1401": "458100",
        "1402": "459400",
        "قبل از 1370": "455250"
    }
    var built_year = 0;
    if (req.body.year && req.body.year > 1402) {
        res.json({ "status": "false", "message": "invalid_year" });
        return;
    }
    if (req.body.year < 1370) {
        built_year = years["قبل از 1370"];
    } else {
        built_year = years[req.body.year];
    }
    if (built_year == 0) {
        res.json({ "status": "false", "message": "invalid_year" });
        return;
    }
    var rooms = {
        "1": "439414",
        "2": "439415",
        "3": "439416",
        "4": "439417",
        "بدون اتاق": "439837",
        "5 به بالا": "439418"
    };
    var ava_room = 0;
    if (req.body.rooms < 0) {
        res.json({ "status": "false", "message": "invalid_room" });
    }
    if (req.body.rooms == 0) {
        ava_room = rooms["بدون اتاق"];
    } else if (req.body.rooms >= 5) {
        ava_room = rooms["5 به بالا"];
    } else {
        ava_room = rooms[req.body.rooms];
    }
    var city_cat = {
        "تهران": "8",
        "مازندران": "27",
        "آذربایجان شرقی": "1",
        "آذربایجان غربی": "2",
        "اردبیل": "3",
        "اصفهان": "4",
        "البرز": "5",
        "ایلام": "6",
        "بوشهر": "7",
        "چهارمحال و بختیاری": "9",
        "خراسان جنوبی": "10",
        "خراسان رضوی": "11",
        "خراسان شمالی": "12",
        "خوزستان": "13",
        "زنجان": "14",
        "سمنان": "15",
        "سیستان و بلوچستان": "16",
        "فارس": "17",
        "قزوین": "18",
        "قم": "19",
        "کردستان": "20",
        "کرمان": "21",
        "کرمانشاه": "22",
        "کهگیلویه و بویراحمد": "23",
        "گلستان": "24",
        "لرستان": "25",
        "گیلان": "26",
        "مرکزی": "28",
        "هرمزگان": "29",
        "همدان": "30",
        "یزد": "31"
    }
    var selected_city = null;
    if (req.body.city && city_cat.indexOf(req.body.city) != -1) {
        selected_city = req.body.city;
    } else {
        res.json({ "status": "false", "message": "invalid_city" });
    }
    const data = {
        location: selected_city,
        a96010: built_year,
        a96002: req.body.parking,
        a96003: req.body.warehouse,
        a96004: req.body.elevator,
        a68085: req.body.size,
        a68133: ava_room,
        price: req.body.price,
        description: req.body.description,
        images: [],
        videos: [],
        category: category[req.body.category],
    };
    headers['Content-Length'] = data.length;
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
        credentials: 'include',
        referrer: 'https://www.sheypoor.com/pro/real-estate/login',
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                res.json({ "status": "false", "message": "invalid_request", "errors": data.errors });
            } else {
                if (data.message && data.message == "آگهی با موفقیت ثبت شد.") {
                    res.json({ "status": "true", "message": "posted" });
                }
            }
        })
        .catch((error) => console.error('Error:', error));
});

app.post("/divar_send_sms", (req, res) => {
    const options = {
        url: 'https://api.divar.ir/v5/auth/authenticate',
        method: 'POST',
        headers: {
            'Host': 'api.divar.ir',
            'Content-Length': 22,
            'Sec-Ch-Ua': 'Not A(Brand";v="24", "Chromium";v="110"',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36',
            'X-Standard-Divar-Error': 'true',
            'Sec-Ch-Ua-Platform': 'Linux',
            'Origin': 'https://divar.ir',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://divar.ir/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9'
        },
        body: '{"phone":"9138780275"}',
    };
    console.log(req.body.phone,req.body.phone.length,req.body.phone.substring(0, 1) == 9)
    if (req.body.phone && req.body.phone.length == 10 && req.body.phone.substring(0, 1) == "9") {
        options.body = `{"phone":"${req.body.phone}"}`;
        options.headers['Content-Length'] = options.body.length;
        request(options, (error, _response, body) => {
            if (error) {
                res.json({ "status": "false", "message": "failed_to_send_sms" });
            } else {
                body = JSON.parse(body);
                if (body.authenticate_response && body.authenticate_response == "AUTHENTICATION_VERIFICATION_CODE_SENT") {
                    res.json({ "status": "true", "message": "sms_code_sent" });
                } else {
                    res.json({ "status": "false", "message": "failed_to_send_sms" });
                }
            }
        });
    } else {
        res.json({ "status": "false", "message": "invalid_phone" });
    }
});

app.post("/divar_verify_sms", (req, res) => {
    const url = 'https://api.divar.ir/v5/auth/confirm';
    const options = {
        method: 'POST',
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\"Not A(Brand\";v=\"24\", \"Chromium\";v=\"110\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-standard-divar-error": "true",
            "Referer": "https://divar.ir/",
            "Referrer-Policy": "origin"
        },
        body: '',
    };
    if (req.body.phone && req.body.phone.length == 10 && req.body.phone.substring(0, 2) == "91" && req.body.code && req.body.code.length == 6 && /^\d+$/.test(req.body.code)) {
        options.body = JSON.stringify({ "phone": req.body.phone, "code": req.body.code });
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    res.json({ "status": "false", "message": "failed_to_verify_sms" });
                }
                return response.json();
            })
            .then(data => {
                const { token } = data;
                res.json({ "status": "true", "message": "done", "token": token });
            })
            .catch(_err => {
                res.json({ "status": "false", "message": "failed_to_verify_sms" });
            });
    } else {
        res.json({ "status": "false", "message": "invalid_phone_and_code" });
    }
});

app.get("/divar_cities", (_req, res) => {
    fetch("https://api.divar.ir/v5/places/cities").then((response) => {
        if (!response.ok) {
            res.json({ "status": "false", "message": "invalid_request" });
        }
        return response.json();
    }).then((data) => {
        const cities = {};
        data.cities.map((c) => {
            cities[c["name"]] = { "id": c["id"], "radius": c["radius"] };
        })
        res.json({ "status": "true", "data": cities });
    }).catch((_err) => {
        res.json({ "status": "false", "message": "invalid_request" });
    });
});

app.post("/divar_post", (req, res) => {
    const url = 'https://api.divar.ir/v8/user-profile/verify_user';
    if (req.body.national_id && req.body.national_id.length == 10) { }
    else {
        res.json({ "status": "false", "message": "invalid_national_id" });
    }
    const data = {
        iranian_identity_info: {
            national_id: req.body.national_id
        }
    };

    const options = {
        method: 'POST',
        headers: {
            "Host": "api.divar.ir",
            "Content-Length": "54",
            "Sec-Ch-Ua": "\"Not A(Brand\";v=\"24\", \"Chromium\";v=\"110\"",
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Sec-Ch-Ua-Mobile": "?0",
            "Authorization": `Basic ${req.body.token}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36",
            "Sec-Ch-Ua-Platform": "\"Linux\"",
            "Origin": "https://divar.ir",
            "Sec-Fetch-Site": "same-site",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://divar.ir/",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-US,en;q=0.9"
        },
        body: JSON.stringify(data),
    };
    options.headers['Content-Length'] = data.length;
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                res.json({ "status": "false", "message": "invalid_national_id", "login": request.status });
            }
            return response.json();
        })
        .then(data => {
            if (data.code) {
                res.json({ "status": "false", "message": "invalid_request" });
            } else {
                if (cities.indexOf(req.body.city) == -1) {
                    res.json({ "status": "false", "message": "invalid_city" });
                }
                var town = cities[req.body.city];
                const location = {
                    "city": town["id"],
                    "radius": town["radius"],
                    "districtError": false
                };

                const requested = {
                    "category": req.body.category,
                    "images": [],
                    "size": req.body.size,
                    "user_type": req.body.user_type,
                    "rent_to_single": req.body.rent_to_single,
                    "rooms": req.body.rooms,
                    "year": req.body.year,
                    "floor": req.body.floor,
                    "elevator": req.body.elevator,
                    "parking": req.body.parking,
                    "warehouse": req.body.warehouse,
                    "national_id": req.body.national_id,
                    "title": req.body.title,
                    "description": req.body.description,
                };
                const url = 'https://api.divar.ir/v8/ongoingposts/multi';
                const data_post = JSON.stringify({
                    "data": {
                        "response_time": {},
                        "video": {},
                        "nationality": "iranian",
                        "transformable_price": {},
                        "contact": {
                            "phone": data.payload.phone,
                            "force_chat_enabled": {},
                            "chat_enabled": true,
                            "contact_description": {},
                            "contact_title": {}
                        },
                        "foreigners_user_profile_not_supported": {},
                        "foreigners_verification_description": {},
                        "national_id_title": {},
                        "user_profile_description": {},
                        "user_profile_title": {},
                        "response_time_description": {},
                        "location": location,
                        "other_options_and_attributes": {
                            "other_options_section": {},
                            "other_attributes_section": {}
                        },
                        requested,
                    },
                    "page": 1,
                    "refetch": false,
                    "verify_user_sign": data.sign,
                    "verify_user_payload": data.payload,
                });
                const options = {
                    method: 'POST',
                    headers: {
                        'Host': 'api.divar.ir',
                        'Content-Length': data_post.length,
                        'Sec-Ch-Ua': 'Not A(Brand";v="24", "Chromium";v="110"',
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'Sec-Ch-Ua-Mobile': '?0',
                        'Authorization': `Basic ${req.body.token}`,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36',
                        'Sec-Ch-Ua-Platform': 'Linux',
                        'Origin': 'https://divar.ir',
                        'Sec-Fetch-Site': 'same-site',
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Dest': 'empty',
                        'Referer': 'https://divar.ir/',
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'en-US,en;q=0.9',
                    },
                    body: data_post,
                };

                fetch(url, options)
                    .then(response => {
                        if (!response.ok) {
                            res.json({ "status": "false", "message": "invalid_request" });
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.code == 200) {
                            res.json({ "status": "true", "message": "posted" });
                        } else {
                            res.json({ "status": "false", "message": "invalid_request" });
                        }
                    })
                    .catch(error => {
                        res.json({ "status": "false", "message": "invalid_request" });
                    });
            }
        })
        .catch(_err => {
            res.json({ "status": "false", "message": "invalid_request" });
        });
});

app.listen(process.env.PORT);

