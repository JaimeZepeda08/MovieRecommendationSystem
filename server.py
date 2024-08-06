from flask import Flask, request, jsonify
from flask_cors import CORS
import gzip
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  # This allows all origins by default

# Load completed ratings matrix
ratings_matrix = pd.read_csv("ratings_matrix.csv")
ratings_matrix.set_index("userId", inplace=True)

# Load movies data once when the server starts
movies = {}
filename = "movie_objects0.769916"
print("loading movie objects...")
with gzip.open(filename, 'rb') as f:
    serialized_data = f.read()
    movies = pickle.loads(serialized_data)

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

for movieId in movies.keys():
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
    genres_picked_by_user = genres.split("%2C")
    movies_to_rate = [movie_by_genre[genre][:5] for genre in genres_picked_by_user]

@app.route("/getMoviePredictions")
def predictMovies():
    pass

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=False, threaded=False)
