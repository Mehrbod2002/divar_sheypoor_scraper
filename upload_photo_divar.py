from flask import Flask, request, jsonify
from playwright.async_api import async_playwright
import asyncio, time

app = Flask(__name__)

request_url = None

async def log_request(request):
    global request_url
    if (request.method == "PUT"):
        request_url = request.url

async def main(photo_path, token):
    try:
        global request_url
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()

            url = photo_path
            cookies_string = "did=b8919944-ed88-4e3e-be8e-29e423dcc2b3; pwa-banner-closed=true; multi-city=isfahan%7C; _gcl_au=1.1.498998832.1690188834; city=isfahan; _gid=GA1.2.1011719799.1690736479; chat_opened=; sessionid=; _ga=GA1.1.1663037824.1690180812; _ga_EZFPVLMGZF=GS1.1.1690737615.2.0.1690737616.59.0.0; token=" + token + "; _ga_SXEW31VJGJ=GS1.1.1690736479.9.1.1690737667.46.0.0"
            cookies = [
                {
                    "name": cookie.split("=")[0],
                    "value": cookie.split("=")[1],
                    "url": "https://divar.ir",
                }
                for cookie in cookies_string.split("; ")
            ]
            page.on("request", log_request)
            await page.context.add_cookies(cookies)
            await page.goto(url)
            await page.set_input_files('input[type="file"]', photo_path)
            time.sleep(100000)
            await browser.close()
            return "Success"
    except:
        return "Error occurred"

@app.route('/process_photo', methods=['POST'])
def process_photo():
    data = request.json
    photo_path = data.get('photo_path')
    token = data.get('token')
    response = asyncio.run(main(photo_path, token))
    if response == "Success" and request_url:
        return jsonify({"response": request_url})
    else:
        return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
