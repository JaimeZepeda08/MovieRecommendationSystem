from flask import Flask, request, send_file
from bs4 import BeautifulSoup
import requests
from io import BytesIO

app = Flask(__name__)

@app.route("/")
def home():
    return "<html><img src='/image.jpg?tmdbId=8844&title=Jumanji'/></html>"

@app.route("/image.jpg")
def fetch_image():
    link = "https://www.themoviedb.org/movie/" 
    tmdbId = request.args.get("tmdbId", None)
    title = request.args.get("title", None)
    
    response = requests.get(link + tmdbId)
    soup = BeautifulSoup(response.content, 'html.parser')
    images = soup.find_all('img')

    poster = None
    for img in images:
        if img.get('alt') == title:
            poster = img
            break
    
    if poster:
        image_url = poster.get("src")
        if not image_url.startswith('http'):
            image_url = "https://www.themoviedb.org" + image_url

        img_response = requests.get(image_url)
        return send_file(BytesIO(img_response.content), mimetype='image/jpeg')
    else:
        return "Image not found", 404

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80, debug=True, threaded=False)
