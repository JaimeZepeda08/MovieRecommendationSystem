import re
import requests
from bs4 import BeautifulSoup

class Movie:
    def __init__(self, movieId, tmdbId, title, genres):
        self.movieId = movieId
        self.tmdbId = tmdbId
        self.title = re.sub(r'\((\d{4})\)', '', title)
        self.release_date = int(re.findall(r'\((\d{4})\)', title)[0]) if len(re.findall(r'\((\d{4})\)', title)) > 0 else 0
        self.genres = genres.split("|")
    
    def loadAllAttributes(self):
        self.html = self.__fetchHTML()

        self.poster = self.__getPoster()
        self.rating = self.__getRating()
        self.certification = self.__getCertification()
        self.runtime = self.__getRuntime()
    
    def __fetchHTML(self):
        url = "https://www.themoviedb.org/movie/" + str(self.tmdbId)
        html = requests.get(url).content
        return BeautifulSoup(html, 'html.parser')
    
    def __getPoster(self):
        poster_img = self.html.find('img', class_="poster w-full")
        if poster_img and 'src' in poster_img.attrs:
            return poster_img['src']
        return None

    def __getRating(self):
        percent_div = self.html.find('div', class_="percent")
        if percent_div:
            span = percent_div.find('span')
            if span and 'class' in span.attrs:
                class_list = ' '.join(span['class'])
                match = re.search(r'icon-r(\d+)', class_list)
                if match:
                    return int(match.group(1))
        return None      

    def __getCertification(self):
        certification = self.html.find('span', class_="certification")
        if certification:
            return certification.text.strip()
        return None

    def __getRuntime(self):
        certification = self.html.find('span', class_="runtime")
        if certification:
            return certification.text.strip()
        return None
    
    def __str__(self):
        movie_repr = "{title}\t{date}\n{genres}"
        return movie_repr.format(title = self.title, 
                                 date = self.release_date,
                                 genres = " | ".join(self.genres))
    
    def __repr__(self):
        return self.__str__()

    def to_dict(self):
        return {
            "movieId": self.movieId,
            "tmdbId": self.tmdbId,
            "title": self.title,
            "release_date": self.release_date,
            "genres": self.genres,
            "poster": self.poster,
            "rating": self.rating,
            "certification": self.certification,
            "runtime": self.runtime
        }