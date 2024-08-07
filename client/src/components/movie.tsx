"use client";

import { useState } from "react";
import { BiMoviePlay } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { LuDot } from "react-icons/lu";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

export interface MovieProps {
  title: string;
  release_date: string;
  certification: string;
  runtime: string;
  poster: string;
  genres: string[];
  rating: number;
  tmdbId: string;
}

export const Movie: React.FC<MovieProps> = ({
  title,
  certification,
  runtime,
  release_date,
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
      } hover:scale-[1.03] transition-transform duration-200 ease-in-out hover:cursor-pointer`}
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
          <div className="w-1/2 h-auto rounded-tr-lg rounded-br-lg bg-black bg-opacity-60 text-white py-4 pl-2 pr-2 space-y-5 transition-opacity duration-300 ease-in-out">
            <div className="space-y-1">
              <div className="flex text-lg font-bold">{title}</div>
              <div className="flex font-thin text-[0.75rem] items-center">
                <div className="px-[0.2rem] py-[0.01rem] border">
                  {certification}
                </div>
                <LuDot />
                <div>{release_date}</div>
                <LuDot />
                <div>{runtime}</div>
              </div>
            </div>
            <div className="flex justify-center relative items-center -translate-x-1 gap-x-8">
              <RatingCircle rating={rating} />
              <BiMoviePlay
                size={28}
                className="opacity-50 hover:opacity-100 cursor-alias"
                onClick={handleVisit}
              />
            </div>
            <div className="absolute bottom-5 flex flex-wrap gap-1 text-[0.68rem] mr-2">
              {genres.map((genre, index) => (
                <span
                  key={index}
                  className="py-[0.175rem] px-1.5 rounded-full bg-slate-400/50"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="hidden group-hover:flex z-10 absolute right-2 top-1/2 -translate-y-8 text-white">
              <IoIosArrowBack size={20} />
            </div>
          </div>
        )}
        <div
          className="absolute -z-10 inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-200 ease-in-out"
          style={{
            backgroundImage: `url(${poster})`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      {!selected && (
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-30 backdrop-blur-sm text-white p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <div className="text-md font-bold">{title}</div>
          <div className="hidden group-hover:flex z-10 absolute right-2 top-1/2 -translate-y-1/2 text-white">
            <IoIosArrowForward size={20} />
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

  let strokeColor;
  if (clampedRating > 70) {
    strokeColor = "green";
  } else if (clampedRating > 50) {
    strokeColor = "yellow";
  } else {
    strokeColor = "red";
  }

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
        <circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      <div className="flex items-center justify-center rounded-full w-10 h-10 text-white text-sm z-10">
        {rating} <span className="font-thin">%</span>
      </div>
    </div>
  );
};

interface MovieCarrouselProps {
  movies: MovieProps[];
}

export const MovieCarrousel: React.FC<MovieCarrouselProps> = ({ movies }) => {
  return (
    <div className="relative flex space-x-5 pr-12 ml-10 my-9">
      {movies.map((movie, index) => (
        <Movie key={index} {...movie} />
      ))}
    </div>
  );
};

interface RateableMovieProps extends MovieProps {
  onRatingUpdate: (tmdbId: string, rating: number) => void;
}

export const RateableMovie: React.FC<RateableMovieProps> = ({
  title,
  poster,
  tmdbId,
  onRatingUpdate,
}) => {
  const [userRating, setUserRating] = useState<number>(0);

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
    onRatingUpdate(tmdbId, rating);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        onClick={() => handleStarClick(index + 1)}
        className="cursor-pointer"
      >
        {userRating > index ? (
          <IoIosStar size={25} className="text-yellow-500" />
        ) : (
          <IoIosStarOutline size={25} className="text-yellow-600/50" />
        )}
      </div>
    ));
  };

  return (
    <div>
      <div className="w-[10rem] group relative">
        <img
          src={poster}
          alt={`${title} Poster`}
          className="w-full h-auto rounded-lg"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-30 backdrop-blur-sm text-white p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <div className="text-sm font-bold">{title}</div>
        </div>
      </div>
      <div className="flex justify-center mt-2">{renderStars()}</div>
    </div>
  );
};
