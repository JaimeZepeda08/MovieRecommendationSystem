import React from "react";
import { MovieCarrousel } from "../components/movie";

const movies = [
  {
    title: "Toy Story",
    release_date: "1998",
    certification: "G",
    runtime: "2h 13m",
    poster: "movietest.jpg",
    genres: ["comedy", "children"],
    rating: 64,
    tmdbId: "862",
  },
  {
    title: "Inception",
    release_date: "2012",
    certification: "TV-MA",
    runtime: "2h 13m",
    poster: "inceptiontest.jpg",
    genres: ["sci-fi", "thriller", "sci-fi", "thriller", "sci-fi", "thriller"],
    rating: 23,
    tmdbId: "27205",
  },
  {
    title: "The Lion King",
    release_date: "1995",
    certification: "PG",
    runtime: "2h 13m",
    poster: "lionkingtest.jpg",
    genres: ["animation", "adventure"],
    rating: 70,
    tmdbId: "8587",
  },
  {
    title: "The Shawshank Redemption",
    release_date: "2014",
    certification: "R",
    runtime: "2h 13m",
    poster: "interstellartest.jpg",
    genres: ["action", "sci-fi"],
    rating: 86,
    tmdbId: "157336",
  },
  {
    title: "Star Wars: Episode IV - A New Hope",
    release_date: "2014",
    certification: "PG-13",
    runtime: "2h 13m",
    poster: "interstellartest.jpg",
    genres: ["action", "sci-fi"],
    rating: 86,
    tmdbId: "157336",
  },
  {
    title: "Interstellar",
    release_date: "2014",
    certification: "PG-13",
    runtime: "2h 13m",
    poster: "interstellartest.jpg",
    genres: ["action", "sci-fi"],
    rating: 86,
    tmdbId: "157336",
  },
  {
    title: "Interstellar",
    release_date: "2014",
    certification: "PG-13",
    runtime: "2h 13m",
    poster: "interstellartest.jpg",
    genres: ["action", "sci-fi"],
    rating: 86,
    tmdbId: "157336",
  },
];

const Home: React.FC = () => {
  return (
    <div className="my-16 ml-8 space-y-8">
      <div>
        <span className="text-white text-2xl ml-5">Top Picks For You:</span>
        <div className="flex overflow-x-scroll">
          <MovieCarrousel movies={movies} />
        </div>
      </div>
      <div>
        <span className="text-white text-2xl ml-5">Comedy:</span>
        <div className="flex overflow-x-scroll">
          <MovieCarrousel movies={movies} />
        </div>
      </div>
      <div>
        <span className="text-white text-2xl ml-5">Horror:</span>
        <div className="flex overflow-x-scroll">
          <MovieCarrousel movies={movies} />
        </div>
      </div>
    </div>
  );
};

export default Home;
