"use client";

import { RateableMovie } from "@/components/movie";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const getQueryParams = () => {
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      return params.get("genres");
    };

    const fetchMovies = async () => {
      try {
        const genres = getQueryParams();

        const moviePromises = await fetch(
          `http://localhost:5001/getMoviesToRate?genres=${genres}`
        ).then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        });
        const moviesData = await Promise.all(moviePromises);
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex justify-center h-screen text-white mt-36">
      <div className="text-center space-y-10">
        <div>
          <h1 className="text-2xl">Rate the movies that you've watched</h1>
          <div className="flex justify-center text-lg">
            <a
              href={`/home`}
              className="group p-3 flex items-center space-x-2 text-gray-400 hover:underline hover:text-yellow-300/60 transition-colors duration-200"
            >
              <h1>Continue</h1>
              <FaArrowRightLong
                size={20}
                className="transform transition-transform duration-200 group-hover:translate-x-3"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 mx-32 pb-20">
          {movies.map((movie, index) => (
            <RateableMovie
              key={index}
              title={movie.title}
              release_date={movie.release_date}
              certification={movie.certification}
              runtime={movie.runtime}
              poster={movie.poster}
              genres={movie.genres}
              rating={movie.rating}
              tmdbId={movie.tmdbId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
