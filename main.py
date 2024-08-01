from flask import Flask, request, send_file
from bs4 import BeautifulSoup
import requests
from io import BytesIO
import zipfile
import pandas as pd
import movie_utils

app = Flask(__name__)

movies = {}

'''
THIS DOES NOT WORK BECAUSE IT RUNS ALL THE TIME!!!!!!!
SHOULD BE DONE BY BACKEND
'''
def preprocess_data():
    files = {}

    with zipfile.ZipFile("ml-32m.zip", 'r') as zip:
        zip_contents = zip.namelist()
        for file_name in zip_contents:
            if file_name.endswith('.csv'):
                print("Downloading " + file_name + "...")
                with zip.open(file_name) as file:
                    df = pd.read_csv(file)
                    files[file_name[7:-4]] = df
    
    files["links"] = files["links"][["movieId", "tmdbId"]]
    files["movies"] = files["movies"].merge(files["links"], left_on="movieId", right_on="movieId", how="inner")

    global movies

    for movie in files["movies"].iterrows():
        movie = movie[1]
        movies[movie.movieId] = movie_utils.Movie(movie.movieId, movie.tmdbId, movie.title, movie.genres)

@app.route("/")
def home():
    movie = movies[1]
    return "<html><img src='/image.jpg?tmdbId={tmdbId}&title={title}'/><p>{repr}</p></html>".format(tmdbId = movie.tmdbId,
                                                                                                      title = movie.title,
                                                                                                      repr = movie)

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
    preprocess_data()
    app.run(host="0.0.0.0", port=80, debug=True, threaded=False)
