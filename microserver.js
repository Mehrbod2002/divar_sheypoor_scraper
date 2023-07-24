import request from 'request';
import express from 'express';
import fetch from 'node-fetch';
import cities from './cities.js';
const app = express();
app.use(express.json());
const port = 3000;

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

