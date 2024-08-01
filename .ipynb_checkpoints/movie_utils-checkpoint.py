import re

class Movie:
    def __init__(self, movieId, title, genres):
        self.movieId = movieId
        self.title = re.sub(r'\((\d{4})\)', '', title)
        self.release_date = int(re.findall(r'\((\d{4})\)', title)[0]) if len(re.findall(r'\((\d{4})\)', title)) > 0 else 0
        self.genres = genres.split("|")
    
    def __str__(self):
        movie_repr = "{title}\t{date}\n{genres}"
        return movie_repr.format(title = self.title, 
                                 date = self.release_date,
                                 genres = " | ".join(self.genres))
    
    def __repr__(self):
        return self.__str__()