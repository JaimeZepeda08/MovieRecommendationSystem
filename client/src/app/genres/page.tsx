"use client";

import Reveal from "@/components/Reveal";
import Spring from "@/components/Spring";
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
    <div className="flex justify-center text-white mt-60 mb-20">
      <div className="text-center space-y-10">
        <Reveal width="w-full" down={true}>
          <h1 className="text-2xl">Pick your favorite genres</h1>
        </Reveal>
        <div className="flex justify-center items-center">
          <div className="w-1/2 flex flex-wrap justify-center">
            {genres.map((genre, index) => (
              <Spring key={genre} delay={0.5 + 0.05 * index} stiffness={40}>
                <div
                  onClick={() => handleSelect(genre)}
                  className={`p-2 px-4 m-2 rounded-full shadow-md transition-all duration-200 hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 inline-block hover:cursor-pointer ${
                    selectedGenres.includes(genre)
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-500 hover:bg-slate-400/20 hover:text-yellow-500"
                  }`}
                >
                  {genre}
                </div>
              </Spring>
            ))}
          </div>
        </div>
        <Reveal horizontal={true} width="w-full" delay={2}>
          <div className="flex justify-center text-lg">
            {selectedGenres.length > 0 ? (
              <a
                href={`/rate-movies?genres=${encodeURIComponent(query)}`}
                className="group p-3 flex items-center space-x-2 text-gray-400 hover:underline hover:text-yellow-300/70 transition-colors duration-200"
              >
                <h1>Continue</h1>
                <FaArrowRightLong
                  size={20}
                  className="transform transition-transform duration-200 group-hover:translate-x-4"
                />
              </a>
            ) : (
              <div className="group p-3 flex items-center space-x-2 text-gray-600">
                <h1>Continue</h1>
                <FaArrowRightLong size={20} />
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Home;
