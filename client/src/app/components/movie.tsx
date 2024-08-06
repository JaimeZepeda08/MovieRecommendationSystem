"use client";

import { useState } from "react";
import { BiMoviePlay } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

interface MovieProps {
  title: string;
  poster: string;
  genres: string[];
  rating: number;
  tmdbId: string;
}

export const Movie: React.FC<MovieProps> = ({
  title,
  poster,
  genres,
  rating,
  tmdbId,
}) => {
  const [selected, setSelected] = useState(false);

  function handleSelect() {
    setSelected(!selected);
  }

  function handleVisit() {
    const base_url = "https://www.themoviedb.org/movie/";
    window.open(base_url + tmdbId, "_blank");
  }

  return (
    <div
      onClick={handleSelect}
      className={`group relative ${
        selected ? "w-[24rem]" : "w-[12rem]"
      } hover:scale-[1.03] hover:cursor-pointer`}
    >
      <div className="relative flex">
        <img
          src={poster}
          alt={`${title} Poster`}
          className={`${
            selected ? "w-1/2 rounded-tr-none rounded-br-none" : "w-full"
          } h-auto rounded-lg`}
        />
        {selected && (
          <div className="w-1/2 h-auto rounded-tr-lg rounded-br-lg bg-black bg-opacity-60 text-white p-4 space-y-4 transition-opacity duration-300 ease-in-out">
            <h1 className="text-lg font-bold">{title}</h1>
            <div className="flex relative items-center px-4 space-x-8">
              <RatingCircle rating={rating} />
              <BiMoviePlay
                size={28}
                className="opacity-20 hover:opacity-100 cursor-alias"
                onClick={handleVisit}
              />
            </div>
            <div className="absolute bottom-5 flex flex-wrap gap-2 text-xs">
              {genres.map((genre, index) => (
                <span
                  key={index}
                  className="p-1 px-2 rounded-full bg-slate-400/50"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="hidden group-hover:flex z-10 absolute right-2 top-1/2 -translate-y-8 text-white">
              <IoIosArrowBack size={25} />
            </div>
          </div>
        )}
        <div
          className="hidden group-hover:block absolute -z-10 inset-0 rounded-lg blur-md opacity-60"
          style={{
            backgroundImage: `url(${poster})`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      {!selected && (
        <div className="hidden group-hover:block absolute bottom-0 left-0 w-full bg-black bg-opacity-30 backdrop-blur-sm text-white p-4 rounded-b-lg transition-opacity duration-300 ease-in-out">
          <h1 className="text-lg font-bold">{title}</h1>
          <div className="hidden group-hover:flex z-10 absolute right-2 top-1/2 -translate-y-1/2 text-white">
            <IoIosArrowForward size={25} />
          </div>
        </div>
      )}
    </div>
  );
};

interface RatingProps {
  rating: number;
}

const RatingCircle: React.FC<RatingProps> = ({ rating }) => {
  const clampedRating = Math.max(0, Math.min(100, rating));
  const radius = 8;
  const strokeWidth = 2;
  const diameter = radius * 2;
  const circumference = Math.PI * diameter;
  const strokeDashoffset =
    circumference - (clampedRating / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center w-12 h-12"
      style={{ padding: strokeWidth / 2 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${diameter + strokeWidth} ${diameter + strokeWidth}`}
        className="absolute"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Progress Circle */}
        <circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="green"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="flex items-center justify-center rounded-full w-10 h-10 text-white text-sm z-10">
        {rating}
      </div>
    </div>
  );
};

interface MovieCarrouselProps {
  movies: MovieProps[];
}

export const MovieCarrousel: React.FC<MovieCarrouselProps> = ({ movies }) => {
  return (
    <div className="relative flex space-x-5 mr-10 ml-8 my-9">
      {movies.map((movie, index) => (
        <Movie
          key={index}
          title={movie.title}
          poster={movie.poster}
          genres={movie.genres}
          rating={movie.rating}
          tmdbId={movie.tmdbId}
        />
      ))}
    </div>
  );
};
