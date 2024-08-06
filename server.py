from flask import Flask, request, jsonify
import gzip
import pickle

app = Flask(__name__)

# Load movies data once when the server starts
movies = {}
filename = "movie_objects0.769916"
print("loading movie objects...")
with gzip.open(filename, 'rb') as f:
    serialized_data = f.read()
    movies = pickle.loads(serialized_data)

@app.route("/getMovie")
def getMovieByID():
    movie_id = request.args.get('id', type=int)
    if movie_id is not None and movie_id in movies:
        testMovie = movies[movie_id]
        return jsonify(testMovie.to_dict())
    else:
        return jsonify({"error": "Movie not found"}), 404

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=False, threaded=False)
