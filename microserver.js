import request from 'request';
import express from 'express';
import fetch from 'node-fetch';
import cities from './cities.js';
const app = express();
app.use(express.json());
const port = 3000;

app.post("/sheypoor_send_sms", (req, res) => {
    const url = 'https://www.sheypoor.com/api/v10.0.0/auth/send';
    const options = {
        method: 'POST',
        headers: {
            'Host': 'www.sheypoor.com',
            'Content-Length': '26',
            'Sec-Ch-Ua': '"Not A(Brand";v="24", "Chromium";v="110"',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36',
            'Sec-Ch-Ua-Platform': '"Linux"',
            'Origin': 'https://www.sheypoor.com',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://www.sheypoor.com/session',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': 'AMP_TOKEN=%24RETRIEVING; ts=b7327854cbe4c285eac3756841da8c14; track_id=14f1f038dfca67e5d54be6327de3197a; _ga=GA1.1.1737732084.1690197303; analytics_token=0e8debfa-e128-720b-9bbb-5a58e3815b4c; analytics_session_token=14bf676e-9796-2da2-5e72-59b4ca04b7d8; yektanet_session_last_activity=7/24/2023; _yngt_iframe=1; _ga_ZQPNE545GF=GS1.1.1690197303.1.1.1690197309.54.0.0; _yngt=4bcb2bb4-46c76-649ae-e0363-3bd60900a3498',
        },
        body: null,
    };
    if (req.body.phone && req.body.phone.length == 10 && req.body.phone.substring(0, 2) == "91") {
        options.body = JSON.stringify({ "username": req.body.phone });
        fetch(url, options)
            .then(response => {
                if (!response.ok || response.status != 200) {
                    res.json({ "status": "false", "message": "failed_to_verify_sms" });
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data?.success) {
                    res.json({ "status": "true", "message": "done", "token": data?.data?.verify.token });
                }
            })
            .catch(_err => {
                res.json({ "status": "false", "message": "failed_to_verify_sms" });
            });
    } else {
        res.json({ "status": "false", "message": "invalid_phone" });
    }
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
    if (req.body.phone && req.body.phone.length == 10 && req.body.phone.substring(0, 2) == "91") {
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

app.post("/sheypoor_verify_sms", (req, res) => {
    const url = 'https://www.sheypoor.com/api/v10.0.0/auth/verify';
    if (req.body.code && req.body.code.length == 4 && /^\d+$/.test(req.body.code) && req.body.token) {
        const options = {
            method: 'POST',
            headers: {
                'Host': 'www.sheypoor.com',
                'Content-Length': '363',
                'Sec-Ch-Ua': '"Not A(Brand";v="24", "Chromium";v="110"',
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Sec-Ch-Ua-Mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36',
                'Sec-Ch-Ua-Platform': '"Linux"',
                'Origin': 'https://www.sheypoor.com',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://www.sheypoor.com/session',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cookie': 'ts=b7327854cbe4c285eac3756841da8c14; analytics_token=0e8debfa-e128-720b-9bbb-5a58e3815b4c; analytics_session_token=14bf676e-9796-2da2-5e72-59b4ca04b7d8; yektanet_session_last_activity=7/24/2023; _yngt_iframe=1; _yngt=4bcb2bb4-46c76-649ae-e0363-3bd60900a3498; verify_token=Bearer+eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJWRVJJRlkifQ.eyJqdGkiOiI2NGJlNWQ3NzZmZDJjOC40NTE5NjA4MiIsImlzcyI6InNoZXlwb29yIiwiYXVkIjoic2hleXBvb3IiLCJpYXQiOjE2OTAxOTczNjcsImV4cCI6MTY5MDE5Nzk2NywibmJmIjoxNjkwMTk3MzY3LCJtb2JpbGUiOiIwOTEzODc4MDI3NSIsInVzZXJJZCI6IjE3Nzg4MjMifQ.2cP59ckLvjjjbTFjG9gA3i6kbTko4b1LNotpAK_0yqI; track_id=da32e42e1d377251e71b323e8552f61f; _ga_ZQPNE545GF=GS1.1.1690197303.1.1.1690197334.29.0.0; _ga=GA1.2.1737732084.1690197303; _gid=GA1.2.489224929.1690197370',
            },
            body: JSON.stringify({ "verify_token": req.body.token, "verification_code": req.body.code }),
        };
        fetch(url, options)
            .then(response => {
                if (!response.ok || response.ok != 200) {
                    res.json({ "status": "false", "message": "failed_to_verify_sms" });
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                res.json({ "status": "true", "message": "done" });
            })
            .catch(_err => {
                res.json({ "status": "false", "message": "failed_to_verify_sms" });
            });
    } else {
        res.json({ "status": "false", "message": "failed_to_verify_sms" });
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

app.listen(port, 3000);

