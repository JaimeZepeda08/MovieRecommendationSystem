"use client";

import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Home: React.FC = () => {
  const genres = [
    "Action",
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
  ];

  const [selectedGenres, modifySelectedGenres] = useState<string[]>([]);

  function handleSelect(genre: string) {
    if (selectedGenres.includes(genre)) {
      modifySelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      modifySelectedGenres([...selectedGenres, genre]);
    }
  }

  const query = selectedGenres.join(",");

  return (
    <div className="flex justify-center h-screen text-white mt-60 mb-20">
      <div className="text-center space-y-10">
        <h1 className="text-2xl">Pick your favorite genres</h1>
        <div className="flex justify-center items-center">
          <div className="w-2/5">
            {genres.map((genre, index) => (
              <span
                key={index}
                onClick={() => handleSelect(genre)}
                className={`p-2 px-4 m-2 rounded-full shadow-md transition-all duration-200 hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 inline-block hover:cursor-pointer ${
                  selectedGenres.includes(genre)
                    ? "bg-yellow-500 text-black"
                    : "bg-slate-400/50 hover:bg-slate-400/20 hover:text-yellow-500"
                }`}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-center text-lg">
          <a
            href={`/rate-movies?genres=${encodeURIComponent(query)}`}
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
    </div>
  );
};

export default Home;
