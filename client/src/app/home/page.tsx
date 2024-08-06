"use client";

import React, { useEffect, useState } from "react";
import { MovieCarrousel } from "../../components/movie";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const movieIds = [1, 2, 3];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviePromises = movieIds.map((id) =>
          fetch(`http://localhost:5001/getMovie?id=${id}`).then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
        );
        const moviesData = await Promise.all(moviePromises);
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="mt-32 mb-16 ml-8 space-y-8">
      <div>
        <span className="text-white text-2xl ml-5">Top Picks for You:</span>
        <div className="flex overflow-x-scroll">
          <MovieCarrousel movies={movies} />
        </div>
      </div>
    </div>
  );
};

export default Home;
