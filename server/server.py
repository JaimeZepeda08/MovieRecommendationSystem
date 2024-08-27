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

# sort movies by genre
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

# Used for testing purposes
@app.route("/getMovie")
def getMovieByID():
    '''
    This function is mainly for testing purposes.
    It returns a JSON object representing the requested movie
    '''

    movie_id = request.args.get('id', type=int)
    if movie_id is not None and movie_id in movies:
        testMovie = movies[movie_id]
        return jsonify(testMovie.to_dict())
    else:
        return jsonify({"error": "Movie not found"}), 404

@app.route("/getMoviesToRate")
def getMoviesToRate():
    '''
    This function returns a shuffled list of JSON objects representing movies. 
    The list includes a combination of movies from the genres selected by the user as well as some aditional ones
    '''

    # retrieve the genres seleted by the user from the search query
    genres = request.args.get('genres', type=str)
    genres_picked_by_user = genres.split(",")

    # get the top 1/3rd of each category
    movies_to_rate = [movie_by_genre[genre][:len(movie_by_genre[genre]) // 3] for genre in genres_picked_by_user]
    movies_to_rate_json = [] 
    selected = set() # used to avoid duplicates

    for genre in movies_to_rate:
        # select 20 random movies from each category
        movies_in_genre = random.sample(genre, min(20, len(genre)))
        for movie in movies_in_genre:
            # this movie has been removed from the tmbd database
            if int(movie.movieId) == __convertId(202249):
                continue
            # make sure the movie is not a duplicate
            if movie.movieId not in selected:
                movies_to_rate_json.append(movie.to_dict())
                selected.add(movie.movieId)

    # add 15 random movies for every category the user selected
    extra_movies = random.sample(list(movies.values()), 15 * len(genres_picked_by_user))
    for movie in extra_movies:
            # make sure the movie is not a duplicate
            if movie.movieId not in selected:
                movies_to_rate_json.append(movie.to_dict())
                selected.add(movie.movieId)

    # shuffle the list of movies
    random.shuffle(movies_to_rate_json)
    return movies_to_rate_json

@app.route("/getMoviePredictions")
def getMoviePredictions():
    '''
    This function returns a list of lists.
    The first list consists of the overall top picks for the user.
    Each of the following lists correspond to a genre the user selected.
    '''

    # retrieve the ratings given by the user from the search query
    user_ratings = request.args.get('ratings', type=str)
    ratings = user_ratings.split(",")

    # retrieve the genres seleted by the user from the search query
    genres = request.args.get('genres', type=str)
    genres_picked_by_user = genres.split(",")

    rated_by_user = set() # uses set to prevent duplicates
    # clean up rating data from user
    for i in range(len(ratings)):
        movie_rating = ratings[i].split(":")
        ratings[i] = (__convertId(int(movie_rating[0])), movie_rating[1])
        rated_by_user.add(__convertId(int(movie_rating[0])))
    
    # new row corresponding to the user that will be added to the movie matrix
    user_df = pd.DataFrame(columns=ratings_matrix.columns.astype(int), 
                           index=[0], 
                           data=np.zeros(len(ratings_matrix.columns)).reshape(1, 1000))
    for movieId, rating in ratings:
        user_df.at[0, movieId] = rating
    
    # predict movies
    predictions = __predictMovies(ratings_matrix, user_df)

    recommended = []
    recommended_movies_by_genre = {}

    for genre in genres_picked_by_user:
        recommended_movies_by_genre[genre] = []


    for movieId in predictions:
        # make sure recommended movies are not repeated
        if int(movieId) not in rated_by_user:
            # this movie has been removed from the tmbd database
            if int(movieId) == __convertId(202249):
                continue
            # add movie to recommended
            recommended.append(movies[int(movieId)].to_dict())
            # recommendations for each genre
            for genre in genres_picked_by_user:
                if genre in movies[int(movieId)].genres:
                    recommended_movies_by_genre[genre].append(movies[int(movieId)].to_dict())

    num_movies = 20 # number of movies to be recommended to the user per category
    recommended_movies = [recommended[:num_movies]]
    recommended_movies.extend([random.sample(movies_by_genre[:num_movies + int(0.5 * num_movies)], num_movies) for movies_by_genre in list(recommended_movies_by_genre.values())])
    return recommended_movies

def __convertId(tmbdId):
    '''
    Helper function. Converts the tmbd ID to the internally used movie ID.
    '''
    return ids.loc[tmbdId].movieId


def __predictMovies(M, user_df):
    '''
    Helper function. Uses the completed matrix and KNN to make movie predictions.
    '''
    combinedM = np.vstack([M.to_numpy(), user_df.to_numpy()])
    imputer = KNNImputer(n_neighbors=10, missing_values=0)
    recommendations = imputer.fit_transform(combinedM)[-1].reshape(1, len(movies.keys()))
    recommendations_df = pd.DataFrame(recommendations, columns=M.columns, index=[0])
    sorted_recommendations = recommendations_df.loc[0].sort_values(ascending=False)
    return sorted_recommendations.index

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=False, threaded=True)
