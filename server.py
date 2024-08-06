from flask import Flask, request, jsonify
from flask_cors import CORS
import gzip
import pickle
import pandas as pd
import numpy as np
from sklearn.impute import KNNImputer
import random

app = Flask(__name__)
CORS(app)  # This allows all origins by default

# Load completed ratings matrix
print("loading ratings matrix...")
ratings_matrix = pd.read_csv("ratings_matrix.csv")
ratings_matrix.set_index("userId", inplace=True)

# Load movies data once when the server starts
movies = {}
filename = "movie_objects0.769916"
print("loading movie objects...")
with gzip.open(filename, 'rb') as f:
    serialized_data = f.read()
    movies = pickle.loads(serialized_data)

# Load sorted list of movies by popularity
print("loading movie list sorted by popularity...")
popular_movies = np.load("popular_movies.npz")["top_popular_movies"]

# Categorize movies by genre
genres = ["Action", 
          "Adventure", 
          "Animation", 
          "Children", 
          "Comedy", 
          "Crime", 
          "Documentary", 
          "Drama", 
          "Fantasy", 
          "Film-Noir", 
          "Horror", 
          "Musical", 
          "Mystery", 
          "Romance", 
          "Sci-Fi", 
          "Thriller", 
          "War", 
          "Western",
          "IMAX"]

movie_by_genre = {}
for genre in genres:
    movie_by_genre[genre] = []

for movieId in popular_movies:
    for genre in movies[movieId].genres:
        movie_by_genre[genre].append(movies[movieId])

@app.route("/getMovie")
def getMovieByID():
    movie_id = request.args.get('id', type=int)
    if movie_id is not None and movie_id in movies:
        testMovie = movies[movie_id]
        return jsonify(testMovie.to_dict())
    else:
        return jsonify({"error": "Movie not found"}), 404

@app.route("/getMoviesToRate")
def getMoviesToRate():
    genres = request.args.get('genres', type=str)
    genres_picked_by_user = genres.split(",")
    movies_to_rate = [movie_by_genre[genre][:len(movie_by_genre[genre]) // 4] for genre in genres_picked_by_user]
    movies_to_rate_json = []
    selected = set()
    for genre in movies_to_rate:
        movies_in_genre = random.sample(genre, min(15, len(genre)))
        for movie in movies_in_genre:
            if movie.movieId not in selected:
                movies_to_rate_json.append(movie.to_dict())
                selected.add(movie.movieId)
    return movies_to_rate_json

@app.route("/getMoviePredictions")
def getMoviePredictions():
    pass

def __predictMovies(M, user_df):
    combinedM = np.vstack([M.to_numpy(), user_df.to_numpy()])
    imputer = KNNImputer(n_neighbors=10, missing_values=0)
    recommendations = imputer.fit_transform(combinedM)[-1].reshape(1, num_movies)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=False, threaded=False)
