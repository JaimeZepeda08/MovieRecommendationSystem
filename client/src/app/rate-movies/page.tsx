import { RateableMovie } from "@/components/movie";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Home: React.FC = () => {
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
      genres: [
        "sci-fi",
        "thriller",
        "sci-fi",
        "thriller",
        "sci-fi",
        "thriller",
      ],
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
      title: "The Lion King",
      release_date: "1995",
      certification: "PG",
      runtime: "2h 13m",
      poster: "lionkingtest.jpg",
      genres: ["animation", "adventure"],
      rating: 70,
      tmdbId: "8587",
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen text-white mt-24">
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
        <div className="flex flex-wrap justify-center items-center gap-8 mx-32">
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
