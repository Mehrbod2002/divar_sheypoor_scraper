import request from 'request';
import express, { json } from 'express';
import fetch from 'node-fetch';
import { config } from 'dotenv';
import sheypoor_cities from './sheypoor_cities.js';
const app = express();
config();
app.use(express.json());

app.post("/sheypoor/send_sms", (req, res) => {
    if (req.body.phone && req.body.phone.length == 10) {
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

app.post("/sheypoor/verify_sms", (req, res) => {
    if (req.body.phone && req.body.phone.length == 10 && req.body.code && req.body.code.length == 4 && /^\d+$/.test(req.body.code) && req.body.token) {
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

app.post("/sheypoor/post", (req, res) => {
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
    var province = null;
    var city = null;
    var region = null;
    if (req.body.province && sheypoor_cities[req.body.province]) {
        if (Array.isArray(sheypoor_cities[req.body.province])) {
            if (req.body?.city) {
                city = sheypoor_cities[req.body.province][1][req.body.city];
                if (req.body?.region) {
                    region = sheypoor_cities[req.body.province][1][0][req.body.city][1][0][req.body.region];
                } else {
                    region = city;
                }
            } else {
                region = province;
            }
        } else {
            province = sheypoor_cities[req.body.province];
        }
    } else {
        res.json({ "status": "false", "message": "invalid_city" });
    }
    const data = {
        location: region,
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

app.post("/divar/send_sms", (req, res) => {
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
    if (req.body.phone && req.body.phone.length == 10) {
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

app.post("/divar/verify_sms", (req, res) => {
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
    if (req.body.phone && req.body.phone.length == 10 && req.body.code && req.body.code.length == 6 && /^\d+$/.test(req.body.code)) {
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
                const data_national_id = {
                    iranian_identity_info: {
                        national_id: req.body.national_id
                    }
                };

                const options_post = {
                    method: 'POST',
                    headers: {
                        "Host": "api.divar.ir",
                        "Content-Length": JSON.stringify(data_national_id).length,
                        "Sec-Ch-Ua": "\"Not A(Brand\";v=\"24\", \"Chromium\";v=\"110\"",
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Authorization": `Basic ${token}`,
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
                    body: JSON.stringify(data_national_id),
                };
                options.headers['Content-Length'] = data_national_id.length;
                fetch("https://api.divar.ir/v8/user-profile/verify_user", options_post)
                    .then(response => {
                        if (!response.ok) {
                            res.json({ "status": "false", "message": "invalid_request" });
                            return;
                        }
                        return response.json();
                    })
                    .then(data => {
                        res.json({ "status": "true", "message": "done", "token": token, "sign": data });
                    })
            })
            .catch(_err => {
                res.json({ "status": "false", "message": "failed_to_verify_sms" });
            });
    } else {
        res.json({ "status": "false", "message": "invalid_phone_and_code" });
    }
});

app.get("/divar/cities", (req, res) => {
    fetch("https://api.divar.ir/v5/places/cities").then((response) => {
        if (!response.ok) {
            res.json({ "status": "false", "message": "invalid_request" });
        }
        return response.json();
    }).then((data) => {
        const distincts = {};
        if (req.query.districts) {
            data.cities.map((c) => {
                if (c["name"] == req.query.districts) {
                    fetch(`https://api.divar.ir/v5/places/cities/${c["id"]}/districts`).then(async (dis) => {
                        if (!dis.ok || dis.status != 200) {
                            res.json({ "status": "false", "message": "invalid_request" });
                        }
                        dis = await dis.json();
                        Object.values(dis["districts"]).map((d) => {
                            distincts[d["name"]] = { "id": d["id"], "radius": d["radius"] };
                        });
                        res.json({ "status": "true", "message": "done", "data": distincts });
                    }).catch((_err) => {
                        res.json({ "status": "false", "message": "invalid_request" });
                    });
                }
            });
        } else {
            const cities = {};
            data.cities.map((c) => {
                cities[c["name"]] = { "id": c["id"], "radius": c["radius"] };
            });
            res.json({ "status": "true", "data": cities });
        }
    }).catch((_err) => {
        res.json({ "status": "false", "message": "invalid_request" });
    });
});

app.post("/divar/post", (req, res) => {
    if (req.body.national_id && req.body.national_id.length == 10) { }
    else {
        res.json({ "status": "false", "message": "invalid_national_id" });
        return;
    }

    if (req.body.city == undefined) {
        res.json({ "status": "false", "message": "invalid_city" });
        return;
    }
    fetch("https://api.divar.ir/v5/places/cities").then((response) => {
        if (!response.ok) {
            res.json({ "status": "false", "message": "invalid_request" });
            return
        }
        return response.json();
    }).then((data) => {
        var found = false;
        for (var c = 0; c < data.cities.length; c++) {
            if (found) {
                break;
            }
            if (data.cities[c]["name"] == req.body.city) {
                var city_id = data.cities[c]["id"];
                fetch(`https://api.divar.ir/v5/places/cities/${city_id}/districts`).then(async (dis) => {
                    if (!dis.ok || dis.status != 200) {
                        res.json({ "status": "false", "message": "invalid_request" }).end();
                        return
                    }
                    dis = await dis.json();
                    for (var d = 0; d < dis["districts"].length; d++) {
                        if (dis["districts"][d]["name"] == req.body.districts) {
                            found = true;
                            const url = 'https://api.divar.ir/v8/ongoingposts/multi';
                            const data = {
                                data: {
                                    other_options_and_attributes: {
                                        other_options_section: {},
                                        other_attributes_section: {},
                                    },
                                    foreigners_user_profile_not_supported: {},
                                    national_id_title: {},
                                    location: {
                                        radius: 500,
                                        neighborhood: dis["districts"][d]["id"],
                                        city: city_id,
                                        districtError: false,
                                    },
                                    contact: {
                                        chat_enabled: true,
                                        contact_description: {},
                                        contact_title: {},
                                        phone: "0" + req.body.phone,
                                        force_chat_enabled: {},
                                    },
                                    user_profile_title: {},
                                    response_time: {},
                                    foreigners_verification_description: {},
                                    user_profile_description: {},
                                    response_time_description: {},
                                    video: {},

                                    category: req.body.category,
                                    images: req.body.images,
                                    rooms: req.body.rooms,
                                    year: req.body.year,
                                    floor: req.body.floor,
                                    elevator: req.body.elevator,
                                    parking: req.body.parking,
                                    warehouse: req.body.warehouse,
                                    title: req.body.title,
                                    description: req.body.description,
                                    size: req.body.size,
                                    user_type: req.body.user_type,
                                },
                                page: 1,
                                refetch: false,
                            };
                            if (req.body.category == "apartment-rent") {
                                data.data.transformable_price = {
                                    credit: req.body.credit,
                                    rent: req.body.rent,
                                };
                                data.data.rent_to_single = req.body.rent_to_single;
                            } else if (req.body.category == "apartment-sell") {
                                data.data.new_price = req.body.price;
                            }
                            const options = {
                                method: 'POST',
                                headers: {
                                    'Host': 'api.divar.ir',
                                    'Content-Length': JSON.stringify(data).length,
                                    'Sec-Ch-Ua': '"Not A(Brand";v="24", "Chromium";v="110"',
                                    'Accept': 'application/json, text/plain, */*',
                                    'Content-Type': 'application/json',
                                    'Sec-Ch-Ua-Mobile': '?0',
                                    'Authorization': `Basic ${req.body.token}`,
                                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36',
                                    'Sec-Ch-Ua-Platform': '"Linux"',
                                    'Origin': 'https://divar.ir',
                                    'Sec-Fetch-Site': 'same-site',
                                    'Sec-Fetch-Mode': 'cors',
                                    'Sec-Fetch-Dest': 'empty',
                                    'Referer': 'https://divar.ir/',
                                    'Accept-Encoding': 'gzip, deflate',
                                    'Accept-Language': 'en-US,en;q=0.9',
                                },
                                body: JSON.stringify(data),
                            };
                            fetch(url, options)
                                .then(response => {
                                    return response.json();
                                })
                                .then(data => {
                                    if (data.code == 200) {
                                        return res.json({ "status": "true", "message": "posted", "data": data }).end();
                                    } else {
                                        if (data.code == 400 && data.errors?.length != 0) {
                                            return res.json({ "status": "false", "message": "invalid_request", "errors": data.errors }).end();
                                        } else {
                                            return res.json({ "status": "false", "message": "invalid_request" }).end();
                                        }
                                    }
                                }).catch((_err) => {
                                    return res.json({ "status": "false", "message": "invalid_request" }).end();
                                });
                            if (found) {
                                break;
                            }
                        }
                    }
                })
            };
        }
    }).catch((_err) => {
        return res.json({ "status": "false", "message": "invalid_request" }).end();
    });
});

app.post("/divar/upgrade", (req, res) => {
    if (req.body.token && req.body.post_id) { }
    else {
        res.json({ "status": "false", "message": "invalid_post_id" });
        return;
    }
    const url = `https://api.divar.ir/v8/real-estate/payment/start/post/${req.body.post_id}`;
    const data = {
        cost_ids: [45017],
        cost_to_option: { '45017': 'USE_QUOTA' },
    };
    const options = {
        method: 'POST',
        headers: {
            'Host': 'api.divar.ir',
            'Content-Length': JSON.stringify(data).length,
            'Sec-Ch-Ua': '"Not A(Brand";v="24", "Chromium";v="110"',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Sec-Ch-Ua-Mobile': '?0',
            'Authorization': `Basic ${req.body.token}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36',
            'Sec-Ch-Ua-Platform': '"Linux"',
            'Origin': 'https://divar.ir',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://divar.ir/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.code == 200) {
                return res.json({ "status": "true", "message": "done" }).end();
            } else {
                return res.json({ "status": "false", "message": "invalid_request", "error": data.message }).end();

            }
        }).catch((_err) => {
            return res.json({ "status": "false", "message": "invalid_request" }).end();
        });
});

app.listen(process.env.PORT);

