"use client";

import { RateableMovie } from "@/components/movie";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [genres, setGenres] = useState<string>("");

  useEffect(() => {
    const getQueryParams = () => {
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      return params.get("genres");
    };

    const fetchMovies = async () => {
      try {
        const genres = getQueryParams();
        if (genres != null) {
          setGenres(genres);
        }

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

  const handleRatingUpdate = (tmdbId: string, rating: number) => {
    setRatings((prevRatings) => ({ ...prevRatings, [tmdbId]: rating }));
  };

  const serializeRatings = () => {
    return Object.entries(ratings)
      .map(([id, rating]) => `${id}:${rating}`)
      .join(",");
  };

  return (
    <div className="flex justify-center h-screen text-white mt-36">
      <div className="text-center space-y-10">
        <div>
          <h1 className="text-2xl">Rate the movies that you've watched</h1>
          <h1 className="text-sm font-thin">
            {"(The more movies you rate, the better the predictions will be)"}
          </h1>
          <div className="flex justify-center text-lg mt-4">
            <a
              href={`/home?ratings=${serializeRatings()}&genres=${genres}`}
              className="group p-3 flex items-center space-x-2 text-gray-400 hover:underline hover:text-yellow-300/70 transition-colors duration-200"
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
          {movies.map((movie) => (
            <RateableMovie
              key={movie.tmdbId}
              {...movie}
              onRatingUpdate={handleRatingUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
