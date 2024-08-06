import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Home: React.FC = () => {
  const title = "Fakeflix";
  const titleArray = title.split("");

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div className="text-center">
        <div className="relative mb-64">
          <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="text-7xl font-bold text-yellow-600 curved-title">
              {titleArray.map((letter, index) => (
                <span key={index} className={`letter-${index}`}>
                  {letter}
                </span>
              ))}
            </h1>
          </div>
        </div>
        <div className="flex justify-center text-lg">
          <a
            href="/genres"
            className="group p-3 flex items-center space-x-2 text-gray-400 hover:underline hover:text-yellow-300/60 transition-colors duration-200"
          >
            <h1>Get Started</h1>
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
