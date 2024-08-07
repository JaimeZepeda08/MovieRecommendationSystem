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
print("Loading ratings matrix...")
ratings_matrix = pd.read_csv("ratings_matrix.csv")
ratings_matrix.set_index("userId", inplace=True)

# Load movies data once when the server starts
movies = {}
filename = "movie_objects0.769916"
print("Loading movie objects...")
with gzip.open(filename, 'rb') as f:
    serialized_data = f.read()
    movies = pickle.loads(serialized_data)

# Load sorted list of movies by popularity
print("Loading movie list sorted by popularity...")
popular_movies = np.load("popular_movies.npz")["top_popular_movies"]

# Categorize movies by genre
print("Categorizing movies by genre...")
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

# Load conversion chart
print("Loading id conversion chart...")
ids = pd.read_csv("id_conversion_chart.csv")
ids.set_index("tmdbId", inplace=True)

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
        movies_in_genre = random.sample(genre, min(20, len(genre)))
        for movie in movies_in_genre:
            if movie.movieId not in selected:
                movies_to_rate_json.append(movie.to_dict())
                selected.add(movie.movieId)
    extra_movies = random.sample(list(movies.values()), 15 * len(genres_picked_by_user))
    for movie in extra_movies:
            if movie.movieId not in selected:
                movies_to_rate_json.append(movie.to_dict())
                selected.add(movie.movieId)
    random.shuffle(movies_to_rate_json)
    return movies_to_rate_json

# TODO return movies separated by categories
# TODO add some randomness so that more movies are shown
@app.route("/getMoviePredictions")
def getMoviePredictions():
    user_ratings = request.args.get('ratings', type=str)
    ratings = user_ratings.split(",")

    genres = request.args.get('genres', type=str)
    genres_picked_by_user = genres.split(",")

    rated_by_user = set()
    for i in range(len(ratings)):
        movie_rating = ratings[i].split(":")
        ratings[i] = (__convertId(int(movie_rating[0])), movie_rating[1])
        rated_by_user.add(__convertId(int(movie_rating[0])))
    
    user_df = pd.DataFrame(columns=ratings_matrix.columns.astype(int), 
                           index=[0], 
                           data=np.zeros(len(ratings_matrix.columns)).reshape(1, 1000))

    for movieId, rating in ratings:
        user_df.at[0, movieId] = rating
    
    predictions = __predictMovies(ratings_matrix, user_df)

    recommended = []
    recommended_movies_by_genre = {}
    for genre in genres_picked_by_user:
        recommended_movies_by_genre[genre] = []

    for movieId in predictions:
        if int(movieId) not in rated_by_user:
            recommended.append(movies[int(movieId)].to_dict())
            for genre in genres_picked_by_user:
                if genre in movies[int(movieId)].genres:
                    recommended_movies_by_genre[genre].append(movies[int(movieId)].to_dict())

    num_movies = 20
    recommended_movies = [recommended[:num_movies]]
    recommended_movies.extend([movies_by_genre[:num_movies] for movies_by_genre in list(recommended_movies_by_genre.values())])
    return recommended_movies

def __convertId(tmbdId):
    return ids.loc[tmbdId].movieId


def __predictMovies(M, user_df):
    combinedM = np.vstack([M.to_numpy(), user_df.to_numpy()])
    imputer = KNNImputer(n_neighbors=10, missing_values=0)
    recommendations = imputer.fit_transform(combinedM)[-1].reshape(1, len(movies.keys()))
    recommendations_df = pd.DataFrame(recommendations, columns=M.columns, index=[0])
    sorted_recommendations = recommendations_df.loc[0].sort_values(ascending=False)
    return sorted_recommendations.index

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=False, threaded=False)
