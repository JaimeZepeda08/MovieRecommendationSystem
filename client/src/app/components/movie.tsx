import React from "react";

interface MovieProps {
  title: string;
  poster: string;
  genres: string[];
}

const Movie: React.FC<MovieProps> = ({ title, poster, genres }) => {
  return (
    <div className="group relative w-[14rem]">
      <img
        src={poster}
        alt={`${title} Poster`}
        className="w-full h-auto shadow-2xl rounded-lg"
      />
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-4 rounded-b-lg">
        <h1 className="text-lg font-bold">{title}</h1>
        <div className="hidden group-hover:block mt-2 text-sm">
          {genres.map((genre, index) => (
            <span
              key={index}
              className="mr-2 p-1 px-2 rounded-full bg-slate-100/50"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
