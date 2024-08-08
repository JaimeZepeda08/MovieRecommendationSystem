"use client";

import React, { useEffect, useState } from "react";
import { MovieCarrousel } from "@/components/movie";
import FadeIn from "@/components/FadeIn";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[][]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const getQueryParams = () => {
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      return [params.get("ratings"), params.get("genres")];
    };

    const fetchMovies = async () => {
      try {
        const [ratings, genres] = getQueryParams();
        if (genres) {
          setGenres(genres.split(","));
        }

        const response = await fetch(
          `http://localhost:5001/getMoviePredictions?ratings=${ratings}&genres=${genres}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const moviesData = await response.json();
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    fetchMovies();
  }, []);

  if (movies[0]) {
    return (
      <div className="mt-32 mb-16 ml-8 space-y-8">
        <div>
          <FadeIn>
            <span className="text-white text-2xl ml-5">Top Picks for You:</span>
          </FadeIn>
          <div className="flex overflow-x-scroll">
            <MovieCarrousel movies={movies[0] || []} />
          </div>
        </div>
        {/* the website is requesting movies twice (idk why) so these change because of the added randomness */}
        {genres.map((genre, index) => (
          <div key={index}>
            <FadeIn>
              <span className="text-white text-2xl ml-5">{genre}</span>
            </FadeIn>
            <div className="flex overflow-x-scroll">
              <MovieCarrousel movies={movies[index + 1] || []} />
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="text-3xl font-bold text-yellow-600 w-full h-screen flex justify-center items-center">
        <span className="loading-text">Loading</span>
        <span className="dot one">.</span>
        <span className="dot two">.</span>
        <span className="dot three">.</span>
      </div>
    );
  }
};

export default Home;
